import http from "http";
import "./config";
import app from "./app";
import { secrets, crons } from "../utils";

// Create the server
const server = http.createServer(app);

// Start listening
server.listen(secrets.PORT, () => {
  // Crons
  crons.start();

  // eslint-disable-next-line no-console
  console.log(`💻 App listening on port ${secrets.PORT}`);
});

server.on("close", async () => {
  // Close all crons
  crons.stop();
});

export default server;
