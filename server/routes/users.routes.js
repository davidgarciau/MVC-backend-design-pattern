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

  return router;
};