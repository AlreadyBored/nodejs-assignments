import http from "http";
import { URL } from "url";
import { MemoryDB } from "./db/memory";
import { handleClientError, handleServerError } from "./utils/errorHandler";
import { isValidId } from "./utils/helpr";

export const createServer = async () => {
  const server = http.createServer(async (req, res) => {
    const url = new URL(req.url || "", `http://${req.headers.host}`);
    const { pathname } = url;
    const method = req.method || "GET";
    const id = pathname.split("/")[3];

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (method === "OPTIONS") {
      res.writeHead(204);
      res.end();
      return;
    }

    // Handle body data
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", async () => {
      try {
        const data =
          (method === "POST" || method === "PUT") && body
            ? JSON.parse(body)
            : undefined;

        // GET all users
        if (method === "GET" && pathname === "/api/users") {
          const users = await MemoryDB.findAll();
          res.writeHead(200, { "Content-Type": "application/json" });
          return res.end(JSON.stringify(users));
        }

        // GET user by ID
        if (method === "GET" && pathname.startsWith("/api/users/")) {
          if (!id || !isValidId(id)) {
            return handleClientError(res, 400, "Invalid user ID");
          }
          const user = await MemoryDB.findOne(id);
          if (!user) {
            return handleClientError(res, 404, "User not found");
          }
          res.writeHead(200, { "Content-Type": "application/json" });
          return res.end(JSON.stringify(user));
        }

        // POST
        if (method === "POST" && pathname === "/api/users") {
          if (!body) {
            return handleClientError(res, 400, "Request body required");
          }

          const userData = JSON.parse(body);
          const missingFields: string[] = [];
          if (!userData.username) missingFields.push("username");
          if (userData.age === undefined) missingFields.push("age");
          if (userData.hobbies === undefined) missingFields.push("hobbies");

          if (missingFields.length > 0) {
            return handleClientError(res, 400, "Missing required fields");
          }

          const newUser = await MemoryDB.create({
            username: userData.username,
            age: userData.age,
            hobbies: userData.hobbies || [],
          });

          res.writeHead(201, {
            "Content-Type": "application/json",
            Location: `/api/users/${newUser.id}`,
          });
          return res.end(JSON.stringify(newUser));
        }

        // PUT
        if (method === "PUT" && pathname.startsWith("/api/users/")) {
          if (!isValidId(id)) {
            return handleClientError(res, 400, "Invalid user ID");
          }

          const updateData = JSON.parse(body);
          const validationErrors: string[] = [];

          if (
            updateData.username !== undefined &&
            typeof updateData.username !== "string"
          ) {
            validationErrors.push("Username must be a string");
          }
          if (
            updateData.age !== undefined &&
            typeof updateData.age !== "number"
          ) {
            validationErrors.push("Age must be a number");
          }
          if (
            updateData.hobbies !== undefined &&
            !Array.isArray(updateData.hobbies)
          ) {
            validationErrors.push("Hobbies must be an array");
          }

          if (validationErrors.length > 0) {
            return handleClientError(res, 400, "Validation failed");
          }

          const existingUser = await MemoryDB.findOne(id);
          if (!existingUser) {
            return handleClientError(
              res,
              404,
              `User with ID ${id} does not exist`
            );
          }

          const updatedUser = await MemoryDB.update(id, {
            username: updateData.username ?? existingUser.username,
            age: updateData.age ?? existingUser.age,
            hobbies: updateData.hobbies ?? existingUser.hobbies,
          });

          res.writeHead(200, { "Content-Type": "application/json" });
          return res.end(JSON.stringify(updatedUser));
        }

        // DELETE
        if (method === "DELETE" && pathname.startsWith("/api/users/")) {
          if (!isValidId(id)) {
            return handleClientError(res, 400, "Invalid UUID format");
          }

          const user = await MemoryDB.findOne(id);
          if (!user) {
            return handleClientError(res, 404, "User not found");
          }

          const isDeleted = await MemoryDB.delete(id);
          if (!isDeleted) {
            return handleClientError(
              res,
              404,
              `User with ID ${id} does not exist`
            );
          }

          res.writeHead(204);
          return res.end();
        }

        // 404 for all other endpoints
        return handleClientError(res, 404, "Endpoint not found");
      } catch (error) {
        if (error instanceof SyntaxError) {
          return handleClientError(res, 400, "Invalid JSON format");
        } else {
          return handleServerError(res, error);
        }
      }
    });

    return server;
  });
  return server;
};
