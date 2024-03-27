const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Parse request bodies (as JSON)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define routes
const gameRoutes = require('./src/routes/games');
app.use('/games', gameRoutes);

// Home route
app.get('/', (req, res) => {
    res.redirect('/games');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
