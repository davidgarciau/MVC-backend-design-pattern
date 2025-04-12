const players = [];
let marcoPlayer = null;
const polosQueGritaron = [];


const roleTypes = ['marco', 'polo', 'polo-especial'];

let shuffledRoles = [...roleTypes];

function shuffleRoles() {

  shuffledRoles = [...roleTypes];
  for (let i = shuffledRoles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledRoles[i], shuffledRoles[j]] = [shuffledRoles[j], shuffledRoles[i]];
  }
  return shuffledRoles;
}

function getShuffledRoles() {
  return shuffledRoles;
}

function getNextRole() {

  const nextRoleIndex = players.length;
  if (nextRoleIndex >= shuffledRoles.length) {
    return null; 
  }
  return shuffledRoles[nextRoleIndex];
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
  return roleTypes;
}

function getPlayerById(id) {
  return players.find(p => p.id === id);
}

function resetPlayers() {
  players.length = 0;
  marcoPlayer = null;
  resetPoloResponses();
  // Reset shuffled roles to original order
  shuffledRoles = [...roleTypes];
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
  getShuffledRoles,
  getNextRole,
  getPlayerById,
  resetPlayers
}; 