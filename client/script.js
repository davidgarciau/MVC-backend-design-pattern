const socket = io('http://localhost:3000');

const registerSection = document.getElementById('register');
const gameSection = document.getElementById('game');
const roleDisplay = document.getElementById('role');
const marcoSection = document.getElementById('marcoSection');
const poloSection = document.getElementById('poloSection');
const marcoBtn = document.getElementById('marcoBtn');
const poloBtn = document.getElementById('poloBtn');
const poloSelection = document.getElementById('poloSelection');
const polo1Btn = document.getElementById('polo1Btn');
const polo2Btn = document.getElementById('polo2Btn');
const gameOverSection = document.getElementById('gameOver');
const gameOverMessage = document.getElementById('gameOverMessage');

let player = null;
let polosQueGritaron = [];


poloBtn.disabled = true;

document.getElementById('registerBtn').addEventListener('click', () => {
  const name = document.getElementById('name').value;
  if (!name) {
    alert('Please enter your name');
    return;
  }

  fetch('http://localhost:3000/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name })
  })
  .then(response => response.json())
  .then(data => {
    player = data;
    roleDisplay.textContent = player.role;
    registerSection.style.display = 'none';
    gameSection.style.display = 'block';

    if (player.role === 'marco') {
      marcoSection.style.display = 'block';
    } else {
      poloSection.style.display = 'block';
    }

    socket.emit('joinGame', player.id);
  })
  .catch(error => {
    console.error('Error registering player:', error);
  });
});

marcoBtn.addEventListener('click', () => {
  socket.emit('marco');
});

poloBtn.addEventListener('click', () => {
  socket.emit('polo', player.id);
});

socket.on('startGame', (players) => {
    const currentPlayer = players.find(p => p.id === player.id);
    if (currentPlayer) {
      roleDisplay.textContent = currentPlayer.role;
      if (currentPlayer.role === 'marco') {
        marcoSection.style.display = 'block';
      } else {
        poloSection.style.display = 'block';
      }
    }
  });

socket.on('startGame', (players) => {
  const currentPlayer = players.find(p => p.id === player.id);
  if (currentPlayer) {
    roleDisplay.textContent = currentPlayer.role;
    if (currentPlayer.role === 'marco') {
      marcoSection.style.display = 'block';
    } else {
      poloSection.style.display = 'block';
    }
  }
});


socket.on('marcoCalled', () => {
  if (player.role !== 'marco') {
    poloBtn.disabled = false; 
    poloBtn.style.display = 'block';
  }
});

socket.on('poloCalled', (polos) => {
  if (player.role === 'marco') {
    polosQueGritaron = polos; 
    poloSelection.style.display = 'block';
    polo1Btn.textContent = `Polo 1 (${polos[0].name})`;
    polo2Btn.textContent = `Polo 2 (${polos[1].name})`;
  }
});

polo1Btn.addEventListener('click', () => {
  if (polosQueGritaron.length > 0) {
    socket.emit('selectPolo', polosQueGritaron[0].id); 
    console.log('Polo 1 selected:', polosQueGritaron[0].id); 
  }
});

polo2Btn.addEventListener('click', () => {
  if (polosQueGritaron.length > 1) {
    socket.emit('selectPolo', polosQueGritaron[1].id); 
    console.log('Polo 2 selected:', polosQueGritaron[1].id); 
  }
});

  socket.on('gameOver', (data) => {
    alert(data.message);
    gameOverSection.style.display = 'block';
    marcoSection.style.display = 'none';
    poloSection.style.display = 'none';
  

    poloBtn.disabled = true;
    poloBtn.style.display = 'none';
  });