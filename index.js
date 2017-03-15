/**
 * Created by Rain on 2016/12/30.
 */
const path = require('path');

const express = require('express');
const app = express();

const server = require('http').createServer(app);

const port = process.env.PORT || 3002;

server.listen(port);

const io = require('socket.io')(server);

app.use('/public', express.static(path.join(__dirname + '/public')));

let numUsers = 0;

//看到这个addedUser  的意思 ，大致猜测，每次的联入都是一个新的作用于，
//addedUser 为每个 socket 连接所 独有
io.on('connect', function (socket) {
  let addedUser = false;

  // client  connect 事件中有一个send操作，发送了信息
  socket.on('message', function (message) {
    socket.emit('message', 'test'); //回复客户端， 表示已经连接吧。。。。我猜的
  });

  //添加用户
  socket.on('add user', function (username) {
    if (addedUser)return;

    socket.username = username;
    ++numUsers;
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers
    });
    //广播 给所有用户，告诉他们有人加入了
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });
  });

  //添加新消息
  socket.on('new message', function (data) {
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', function () {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', function () {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', function () {
    if (addedUser) {
      --numUsers;

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });

  socket.on('disconnect', function () {
    console.log('disconnect');
  })
});
