/* eslint-disable no-unused-vars */
const amqplib = require('amqplib');

const configs = require('../../common/utils/configs');
const {PLAYLIST_QUEUE} = require('../../common/constants');

// VsCode-JsCode purpose
const Listener = require('./listener');

/**
 * Run MQ Consumer.
 *
 * @param {Listener} listener
 */
const runConsumer = async (listener) => {
  const connection = await amqplib.connect(configs.mq.server);
  const channel = await connection.createChannel();

  await channel.assertQueue(PLAYLIST_QUEUE, {
    durable: true,
  });

  await channel.consume(
      PLAYLIST_QUEUE,
      (msg) => listener.listen(msg),
      {noAck: true},
  );

  console.log('Consumer running...');
};

module.exports = runConsumer;
