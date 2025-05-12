import { createServer } from "./server";

const port = parseInt(process.env.PORT!, 10);

createServer().then((server) => {
  server.listen(port, () => {
    console.log(`Worker listening on http://localhost:${port}`);
  });
});
