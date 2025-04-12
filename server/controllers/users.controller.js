const userModel = require('../db/users.db');
const gameModel = require('../db/game.model');
const socketService = require('../services/socket.service');

function registerPlayer(name) {
  const players = userModel.getAllPlayers();
  
  if (players.length >= 3) {
    throw new Error('Game is full');
  }

  let shuffledRoles;
  if (players.length === 0) {
    shuffledRoles = userModel.shuffleRoles();
  }

  const roles = userModel.getAvailableRoles();
  const role = shuffledRoles ? shuffledRoles[players.length] : roles[players.length];
  
  const player = userModel.createPlayer(name, role);
  
  // If we now have 3 players, game can start
  if (players.length === 3) {
    gameModel.setGameState(gameModel.GameState.IN_PROGRESS);
  }
  
  return player;
}

function startGame(io) {
  const players = userModel.getAllPlayers();
  if (players.length === 3 && gameModel.getCurrentState() === gameModel.GameState.NOT_STARTED) {
    gameModel.setGameState(gameModel.GameState.IN_PROGRESS);
    socketService.notifyPlayers(io);
  }
}

function handleMarcoCall(io) {
  if (gameModel.getCurrentState() !== gameModel.GameState.IN_PROGRESS) {
    return { error: 'Game not in progress' };
  }
  
  socketService.handleMarco(io);
  return { success: true };
}

function handlePoloResponse(io, userId) {
  if (gameModel.getCurrentState() !== gameModel.GameState.IN_PROGRESS) {
    return { error: 'Game not in progress' };
  }
  
  const player = userModel.getPlayerById(userId);
  if (!player) {
    return { error: 'Player not found' };
  }
  
  socketService.handlePolo(io, userId);
  return { success: true };
}

function selectPolo(io, selectedPoloId) {
  if (gameModel.getCurrentState() !== gameModel.GameState.IN_PROGRESS) {
    return { error: 'Game not in progress' };
  }
  
  socketService.handleSelectPolo(io, selectedPoloId);
  return { success: true };
}

function resetGame() {
  userModel.resetPlayers();
  gameModel.resetGame();
  return { success: true };
}

module.exports = {
  registerPlayer,
  startGame,
  handleMarcoCall,
  handlePoloResponse,
  selectPolo,
  resetGame
};
