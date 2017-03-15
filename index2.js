/**
 * Created by Rain on 2016/12/30.
 */
const path = require('path');

const express = require('express');
const app = express();

const server = require('http').createServer(app);

server.listen(3002);

const io = require('socket.io')(server);

app.use('/public', express.static(path.join(__dirname + '/public')));

io.on('connect', function (socket) {

  socket.on('message', function (data) {
    console.log(data);

    socket.emit('message', 'welcome  socket.io的世界')
  });

  socket.on('new message', function (data) {
    socket.broadcast.emit('new message', data)
  });

  socket.on('join user', function (username) {
    socket.broadcast.emit('join user', username);
  });


  socket.on('disconnect', function () {
    console.log('断开连接');
  })
});
