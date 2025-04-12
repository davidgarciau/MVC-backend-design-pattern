const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const userController = require('./controllers/users.controller');
const socketService = require('./services/socket.service');

const userRoutes = require('./routes/users.routes');

const app = express();
app.use(cors());
app.use(express.json());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const PORT = 3000;

app.use('/', userRoutes(io));

io.on('connection', (socket) => {
  console.log('a user connected:', socket.id);

  socket.on('marco', () => {
    userController.handleMarcoCall(io);
  });

  socket.on('polo', (userId) => {
    userController.handlePoloResponse(io, userId);
  });

  socket.on('selectPolo', (selectedPoloId) => {
    userController.selectPolo(io, selectedPoloId);
  });

  socket.on('resetGame', () => {
    userController.resetGame();
    socketService.resetGame(io);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});