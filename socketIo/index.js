const express = require('express'); 
const http = require('http');
const { Server } = require('socket.io'); 

const app = express();

app.use(express.static('public'));

const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  let userName;

  socket.on('set username', (name) => {
    userName = name;
    socket.broadcast.emit('user joined', `${userName} has joined the chat`);
  });

  socket.on('chat message', (msg) => {
    const messageData = { msg: msg, name: userName, type: 'received' };
    socket.broadcast.emit('chat message', messageData); 
    messageData.type = 'sent';
    socket.emit('chat message', messageData); 
  });

  socket.on('disconnect', () => {
    if (userName) {
      socket.broadcast.emit('user left', `${userName} has left the chat`);
    }
  });
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
