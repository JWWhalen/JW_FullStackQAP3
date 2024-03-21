UPDATE video_games SET name = $2, genre = $3, platform = $4, developer = $5, release_date = $6 WHERE game_id = $1;
