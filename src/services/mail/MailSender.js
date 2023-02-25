const nodemailer = require('nodemailer');

const configs = require('../../common/utils/configs');

/**
 * Email Service.
 */
class MailSender {
  #transporter;

  /**
   */
  constructor() {
    this.#transporter = nodemailer.createTransport({
      host: configs.smtp.host,
      port: configs.smtp.port,
      auth: {
        user: configs.smtp.user,
        pass: configs.smtp.password,
      },
    });
  }

  /**
   * Send mail to target email.
   *
   * @param {string} emailAddress
   * @param {string} content
   *
   * @return {Promise<nodemailer.SentMessageInfo>}
   */
  sendMail(emailAddress, content) {
    /**
     * @type {nodemailer.SendMailOptions}
     */
    const msg = {
      from: 'Open Music API',
      to: emailAddress,
      subject: 'Exported Playlist',
      text: 'The attachment is a playlist json file from the Open Music API',
      attachments: [
        {
          filename: 'playlist.json',
          content,
        },
      ],
    };

    return this.#transporter.sendMail(msg);
  }
}

module.exports = MailSender;
