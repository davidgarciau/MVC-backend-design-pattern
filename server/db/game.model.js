const GameState = {
  NOT_STARTED: 'not_started',
  IN_PROGRESS: 'in_progress',
  FINISHED: 'finished'
};

let currentState = GameState.NOT_STARTED;
let winner = null;

function getCurrentState() {
  return currentState;
}

function setGameState(state) {
  if (Object.values(GameState).includes(state)) {
    currentState = state;
  } else {
    throw new Error('Invalid game state');
  }
}

function getWinner() {
  return winner;
}

function setWinner(winnerRole) {
  winner = winnerRole;
  setGameState(GameState.FINISHED);
}

function resetGame() {
  currentState = GameState.NOT_STARTED;
  winner = null;
}

module.exports = {
  GameState,
  getCurrentState,
  setGameState,
  getWinner,
  setWinner,
  resetGame
}; 