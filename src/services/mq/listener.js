/* eslint-disable no-unused-vars */
// VsCode-JsDoc purpose.
const amqplib = require('amqplib');

const MailSender = require('../mail/MailSender');
const PlaylistsService = require('../db/PlaylistsService');
const PlaylistSongsService = require('../db/PlaylistSongsService');

/**
 * MQ Consumer **Listener**
 */
class Listener {
  #playlistsService;
  #playlistSongsService;
  #mailSender;

  /**
   * @param {PlaylistsService} playlistsService
   * @param {PlaylistSongsService} playlistSongsService
   * @param {MailSender} mailSender
   */
  constructor(playlistsService, playlistSongsService, mailSender) {
    this.#playlistsService = playlistsService;
    this.#playlistSongsService = playlistSongsService;
    this.#mailSender = mailSender;
  }

  /**
   * Callback for consume MQ.
   *
   * @param {amqplib.ConsumeMessage} msg
   */
  async listen(msg) {
    try {
      const {playlistId, targetEmail} = JSON.parse(msg.content.toString());

      const playlist = await this.#playlistsService.getPlaylistById(playlistId);
      playlist['songs'] = await this.#playlistSongsService
          .getSongsFromPlaylist(playlistId);

      const result = await this.#mailSender
          .sendMail(targetEmail, JSON.stringify({playlist}));

      console.log(result);
    } catch (e) {
      console.error(`${e.name}: ${e.message}`);
    }
  }
}

module.exports = Listener;
