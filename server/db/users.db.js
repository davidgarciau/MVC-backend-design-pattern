// Model for users/players
const players = [];
let marcoPlayer = null;
const polosQueGritaron = [];

const roles = ['marco', 'polo', 'polo-especial'];

function shuffleRoles() {
  const rolesArray = [...roles];
  for (let i = rolesArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [rolesArray[i], rolesArray[j]] = [rolesArray[j], rolesArray[i]];
  }
  return rolesArray;
}

function getAllPlayers() {
  return players;
}

function getMarcoPlayer() {
  return marcoPlayer;
}

function getPolosQueGritaron() {
  return polosQueGritaron;
}

function createPlayer(name, role, id) {
  const player = {
    id: id || players.length + 1,
    name,
    role,
    socketId: null
  };

  players.push(player);
  
  if (player.role === 'marco') {
    marcoPlayer = player;
  }
  
  return player;
}

function recordPoloResponse(player) {
  polosQueGritaron.push(player);
}

function resetPoloResponses() {
  polosQueGritaron.length = 0;
}

function getAvailableRoles() {
  return roles;
}

function getPlayerById(id) {
  return players.find(p => p.id === id);
}

function resetPlayers() {
  players.length = 0;
  marcoPlayer = null;
  resetPoloResponses();
}

module.exports = {
  getAllPlayers,
  getMarcoPlayer,
  getPolosQueGritaron,
  createPlayer,
  recordPoloResponse,
  resetPoloResponses,
  getAvailableRoles,
  shuffleRoles,
  getPlayerById,
  resetPlayers
}; 