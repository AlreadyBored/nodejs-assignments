import { ServerResponse } from "http";
import { v4 as uuidv4 } from "uuid";

export const handleServerError = (res: ServerResponse, error: unknown) => {
  const errorId = uuidv4();
  console.error(`[${errorId}] Server Error:`, error);

  res.writeHead(500, {
    "Content-Type": "application/json",
    "X-Error-ID": errorId,
  });

  res.end(
    JSON.stringify({
      error: "Internal Server Error",
      message: "We're sorry, something went wrong. Our team has been notified.",
      reference: errorId,
      timestamp: new Date().toISOString(),
    })
  );
};

export const handleClientError = (
  res: ServerResponse,
  status: number,
  message: string
) => {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: message }));
};
