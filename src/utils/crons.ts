import { CronJob } from 'cron';

const welcome = new CronJob('1 1 * * *', () => {});

export default {
  start: () => {
    welcome.start();
  },

  stop: () => {
    welcome.stop();
  },
};
