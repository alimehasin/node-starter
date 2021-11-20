import "./config";
import app from "./app";
import { secrets, crons } from "./utils";

// Start listening
const server = app.listen(secrets.PORT, () => {
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
