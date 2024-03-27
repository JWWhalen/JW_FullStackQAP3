CREATE TABLE video_games (
    game_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    genre VARCHAR(100) NOT NULL,
    platform VARCHAR(100) NOT NULL,
    developer VARCHAR(100),
    release_date DATE
);
