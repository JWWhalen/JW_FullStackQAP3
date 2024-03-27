const { Pool } = require('pg');

// Set up your database connection here
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Video_game_db',
  password: 'Malachiw1!',
  port: 2705,
});

module.exports = pool;
