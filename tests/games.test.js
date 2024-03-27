const request = require('supertest');
const app = require('../index'); // Adjust if needed

describe('Games API Endpoints', () => {
  let newGameId;

  // Test the GET /games route
  it('GET /games - should return all games', async () => {
    const res = await request(app).get('/games');
    if (res.statusCode !== 200) {
      console.error(res.body);
    }
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  // Test the POST /games route for creating a new game
  it('POST /games - should create a new game', async () => {
    const gameData = {
      name: 'New Game',
      genre: 'Adventure',
      platform: 'PC',
      developer: 'Test Dev',
      release_date: '2022-01-01',
    };
    const res = await request(app).post('/games').send(gameData);
    if (res.statusCode !== 201) {
      console.error(res.body);
    }
    newGameId = res.body.game_id; // Adjust this to the actual response property
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('name', gameData.name);
  });

  // Test the GET /games/:id route for a single game
  it('GET /games/:id - should return a single game', async () => {
    const res = await request(app).get(`/games/${newGameId}`);
    if (res.statusCode !== 200) {
      console.error(res.body);
    }
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('game_id', newGameId);
  });

  // Test the PUT /games/:id route to update a game
  it('PUT /games/:id - should update a game', async () => {
    const gameUpdates = {
      name: 'Updated Game',
      genre: 'Action',
      platform: 'PC',
      developer: 'Updated Dev',
      release_date: '2022-01-02',
    };
    const res = await request(app).put(`/games/${newGameId}`).send(gameUpdates);
    if (res.statusCode !== 200) {
      console.error(res.body);
    }
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('name', gameUpdates.name);
  });

  // Test the DELETE /games/:id route to delete a game
  it('DELETE /games/:id - should delete a game', async () => {
    const res = await request(app).delete(`/games/${newGameId}`);
    if (res.statusCode !== 204) {
      console.error(res.body);
    }
    expect(res.statusCode).toBe(204);
  });
});
