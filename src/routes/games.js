const express = require('express');
const router = express.Router();

// Mock data array
const mockGames = [
  {
    game_id: 1,
    name: 'Legend of Zelda: Breath of the Wild',
    genre: 'Action-adventure',
    platform: 'Nintendo Switch',
    developer: 'Nintendo',
    release_date: new Date('2017-03-03')
  },
  {
    game_id: 2,
    name: 'The Witcher 3: Wild Hunt',
    genre: 'Role-playing',
    platform: 'PlayStation 4, Xbox One, PC',
    developer: 'CD Projekt Red',
    release_date: new Date('2015-05-18')
  },
  // Add more mock games as needed
];

// Routes using the mock data
// GET route for listing all games
router.get('/', async (req, res) => {
    try {
        // Replace the following line with a call to your data access layer when ready
        const games = mockGames;
        res.render('index', { games }); // Render the 'index.ejs' template with the games data
    } catch (error) {
        console.error('Error fetching games:', error);
        res.status(500).send(error.message);
    }
});

// GET route for showing the form to add a new game
router.get('/new', (req, res) => {
    // Render a 'new.ejs' template to show a form for adding a new game
    res.render('new');
});

// Other routes (POST, PUT, DELETE) will also go here and will use the mock data for now

module.exports = router;
