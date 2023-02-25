const {Pool} = require('pg');

const DbTables = require('../../common/utils/DbTables');

/**
 * CRUD Service for "playlists" table from Database.
 */
class PlaylistsService {
  #pool;

  /**
   */
  constructor() {
    this.#pool = new Pool();
  }

  /**
   * Get playlist by id from Database.
   *
   * @param {string} id
   *
   * @typedef {Object} Playlist
   * @property {string} id
   * @property {string} name
   *
   * @return {Promise<Playlist>} Playlists object
   */
  async getPlaylistById(id) {
    const query = {
      text: `
        SELECT id, name FROM ${DbTables.playlists} 
        WHERE ${DbTables.playlists}.id = $1
      `,
      values: [id],
    };
    const {rows} = await this.#pool.query(query);

    if (!rows.length) {
      throw new Error('Playlist Not Found');
    }

    return rows[0];
  }
}

module.exports = PlaylistsService;
