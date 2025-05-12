import cluster from "cluster";
import os from "os";
import http from "http";
import { config } from "./config";

const numCPUs = os.cpus().length;
const basePort = config.port;

if (cluster.isPrimary) {
  // Master process: load balancer
  const workers: { port: number; process: import("cluster").Worker }[] = [];
  let current = 0;

  // Fork workers
  for (let i = 0; i < numCPUs - 1; i++) {
    const port = basePort + 1 + i;
    const worker = cluster.fork({ PORT: port });
    workers.push({ port, process: worker });
  }

  // Create load balancer server
  const server = http.createServer((req, res) => {
    // Round-robin selection
    const worker = workers[current];
    current = (current + 1) % workers.length;

    // Forward request to worker
    const proxyReq = http.request(
      {
        hostname: "127.0.0.1",
        port: worker.port,
        path: req.url,
        method: req.method,
        headers: req.headers,
      },
      (proxyRes) => {
        res.writeHead(proxyRes.statusCode || 500, proxyRes.headers);
        proxyRes.pipe(res, { end: true });
      }
    );
    req.pipe(proxyReq, { end: true });
    proxyReq.on("error", (err) => {
      res.writeHead(502);
      res.end("Bad Gateway");
    });
  });

  server.listen(basePort, () => {
    console.log(`Load balancer running on port ${basePort}`);
    console.log(`Worker servers: ${workers.map((w) => w.port).join(", ")}`);
  });
} else {
  process.env.PORT = process.env.PORT || String(process.env.PORT);
  require("./app");
}
