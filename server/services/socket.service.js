const userModel = require('../db/users.db');
const gameModel = require('../db/game.model');

function notifyPlayers(io) {
  io.emit('startGame', userModel.getAllPlayers());
}

function handleMarco(io) {
  io.emit('marcoCalled');
  console.log('Marco called');
}

function handlePolo(io, userId) {
  const player = userModel.getPlayerById(userId);
  if (player) {
    userModel.recordPoloResponse(player);
    io.emit('poloCalled', userModel.getPolosQueGritaron());
  }
}

function handleSelectPolo(io, selectedPoloId) {
  const selectedPolo = userModel.getPlayerById(selectedPoloId);
  if (selectedPolo) {
    if (selectedPolo.role === 'polo-especial') {
      gameModel.setWinner('marco');
      io.emit('gameOver', { winner: 'marco', message: `Marco wins!` });
    } else {
      gameModel.setWinner('polo');
      io.emit('gameOver', { winner: 'polo', message: `Marco loses!` });
    }
  } else {
    console.error('Selected polo not found');
  }
}

function emitGameState(io) {
  io.emit('gameState', {
    state: gameModel.getCurrentState(),
    winner: gameModel.getWinner()
  });
}

function resetGame(io) {
  userModel.resetPlayers();
  gameModel.resetGame();
  io.emit('gameReset');
}

module.exports = {
  notifyPlayers,
  handleMarco,
  handlePolo,
  handleSelectPolo,
  emitGameState,
  resetGame
}; 