require('dotenv').config();

const PlaylistsService = require('./services/db/PlaylistsService');
const PlaylistSongsService = require('./services/db/PlaylistSongsService');
const MailSender = require('./services/mail/MailSender');
const runConsumer = require('./services/mq/consumer');
const Listener = require('./services/mq/listener');

const main = async () => {
  const playlistsService = new PlaylistsService();
  const playlistSongsService = new PlaylistSongsService();
  const mailSender = new MailSender();

  const listener = new Listener(
      playlistsService, playlistSongsService, mailSender,
  );

  await runConsumer(listener);
};

main();
