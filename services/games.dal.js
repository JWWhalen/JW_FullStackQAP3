const pool = require('./db');

const getAllGames = async () => {
  const result = await pool.query('SELECT * FROM video_games ORDER BY game_id');
  return result.rows;
};

const getGameById = async (gameId) => {
  const result = await pool.query('SELECT * FROM video_games WHERE game_id = $1', [gameId]);
  return result.rows[0];
};

const addGame = async (name, genre, platform, developer, release_date) => {
  const result = await pool.query(
    'INSERT INTO video_games (name, genre, platform, developer, release_date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [name, genre, platform, developer, release_date]
  );
  return result.rows[0];
};

const updateGame = async (gameId, name, genre, platform, developer, release_date) => {
  const result = await pool.query(
    'UPDATE video_games SET name = $2, genre = $3, platform = $4, developer = $5, release_date = $6 WHERE game_id = $1 RETURNING *',
    [gameId, name, genre, platform, developer, release_date]
  );
  return result.rows[0];
};

const deleteGame = async (gameId) => {
  const result = await pool.query('DELETE FROM video_games WHERE game_id = $1', [gameId]);
  return result.rowCount;
};

module.exports = {
  getAllGames,
  getGameById,
  addGame,
  updateGame,
  deleteGame,
};
