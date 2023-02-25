const {Pool} = require('pg');

const DbTables = require('../../common/utils/DbTables');

/**
 * CRUD Service for "playlist_songs" table from Database.
 *
 * This table is the relation table between "playlists" table
 * and "songs" table.
 */
class PlaylistSongsService {
  #pool;

  /**
   */
  constructor() {
    this.#pool = new Pool();
  }

  /**
   * Get songs from playlist.
   *
   * @param {string} id - Playlist id
   *
   * @return {Promise<object[]>} Array of Songs
   */
  async getSongsFromPlaylist(id) {
    const query = {
      text: `
        SELECT 
          ${DbTables.songs}.id, ${DbTables.songs}.title, 
          ${DbTables.songs}.performer 
        FROM ${DbTables.playlistSongs} 
        RIGHT JOIN  ${DbTables.songs} ON 
          ${DbTables.playlistSongs}.song_id = ${DbTables.songs}.id
        WHERE ${DbTables.playlistSongs}.playlist_id = $1
        GROUP BY ${DbTables.songs}.id
      `,
      values: [id],
    };
    const {rows} = await this.#pool.query(query);

    return rows;
  }
}

module.exports = PlaylistSongsService;
