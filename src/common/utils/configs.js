const configs = {
  mq: {
    server: process.env.RABBITMQ_SERVER,
  },
  smtp: {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    user: process.env.MAIL_ADDRESS,
    password: process.env.MAIL_PASSWORD,
  },
};

module.exports = configs;
