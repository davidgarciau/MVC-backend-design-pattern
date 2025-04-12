const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');

module.exports = (io) => {
  router.post('/register', (req, res) => {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }
    try {
      const player = usersController.registerPlayer(name);
      res.status(201).json(player);
      usersController.startGame(io);
    } catch (error) {
      console.error('Registration error:', error);
      res.status(400).json({ error: error.message });
    }
  });

  // Route to get current game information
  router.get('/game-info', (req, res) => {
    try {
      const gameInfo = usersController.getGameInfo();
      res.status(200).json(gameInfo);
    } catch (error) {
      console.error('Game info error:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Route to reset the game
  router.post('/reset-game', (req, res) => {
    try {
      const result = usersController.resetGame();
      io.emit('gameReset');
      res.status(200).json(result);
    } catch (error) {
      console.error('Reset game error:', error);
      res.status(500).json({ error: error.message });
    }
  });

  return router;
};