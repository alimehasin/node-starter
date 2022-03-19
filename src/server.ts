import './config';
import app from './app';
import { crons, logger } from './utils';
import { PORT, ENVIRONMENT } from './utils/secrets';

// Start listening
const server = app.listen(PORT, () => {
  // Crons
  crons.start();

  if (ENVIRONMENT === 'development') {
    logger.info(`💻 Started on http://localhost:${PORT}`);
  } else {
    logger.info(`💻 Started on port ${PORT}`);
  }
});

server.on('close', async () => {
  // Close all crons
  crons.stop();
});

export default server;
