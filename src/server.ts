import "./config";
import app from "./app";
import { crons } from "./utils";
import { PORT, ENVIRONMENT } from "./utils/secrets";

// Start listening
const server = app.listen(PORT, () => {
  // Crons
  crons.start();

  if (ENVIRONMENT === "development") {
    // eslint-disable-next-line no-console
    console.log(`💻 Started on http://localhost:${PORT}`);
  } else {
    // eslint-disable-next-line no-console
    console.log(`💻 Started on port ${PORT}`);
  }
});

server.on("close", async () => {
  // Close all crons
  crons.stop();
});

export default server;
