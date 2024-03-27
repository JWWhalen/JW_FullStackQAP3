const express = require('express');
const router = express.Router();
const gamesDAL = require('../../services/games.dal');

// Route to display all games
router.get('/', async (req, res) => {
  try {
    const games = await gamesDAL.getAllGames();
    res.render('index', { games });
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).send(error.message);
  }
});

// Route to display the form for adding a new game
router.get('/new', (req, res) => {
  res.render('new');
});

// Route to post the form and add a new game
router.post('/', async (req, res) => {
  try {
    const { name, genre, platform, developer, release_date } = req.body;
    await gamesDAL.addGame(name, genre, platform, developer, release_date);
    res.redirect('/games');
  } catch (error) {
    console.error('Error adding new game:', error);
    res.status(500).send(error.message);
  }
});

// Route to display a single game by id
router.get('/:id', async (req, res) => {
  try {
    const game = await gamesDAL.getGameById(req.params.id);
    if (game) {
      res.render('game', { game });
    } else {
      res.status(404).send('Game not found');
    }
  } catch (error) {
    console.error('Error fetching game:', error);
    res.status(500).send(error.message);
  }
});

// Route to display the form for editing an existing game
router.get('/edit/:id', async (req, res) => {
  try {
    const game = await gamesDAL.getGameById(req.params.id);
    if (game) {
      res.render('edit', { game });
    } else {
      res.status(404).send('Game not found');
    }
  } catch (error) {
    console.error('Error fetching game for edit:', error);
    res.status(500).send(error.message);
  }
});

// Route to update an existing game
router.post('/update/:id', async (req, res) => {
  try {
    const { name, genre, platform, developer, release_date } = req.body;
    await gamesDAL.updateGame(req.params.id, name, genre, platform, developer, release_date);
    res.redirect('/games');
  } catch (error) {
    console.error('Error updating game:', error);
    res.status(500).send(error.message);
  }
});

// Route to delete a game


router.post('/delete/:id', async (req, res) => {
  try {
    await gamesDAL.deleteGame(req.params.id);
    res.redirect('/games');
  } catch (error) {
    console.error('Error deleting game:', error);
    res.status(500).send(error.message);
  }
});


// Route to fetch all games as JSON data (REST API)
router.get('/api/games', async (req, res) => {
  try {
    const games = await gamesDAL.getAllGames();
    res.json(games);
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
