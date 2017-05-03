/**
 * Created by toonew on 2017/5/4.
 */
const io = require('socket.io')();

io.on('connect', function (socket) {
  // 每一个 client 建立的socket 都会有一个唯一的id ，
  // io.sockets.sockets有他们的所有列表，那么
  console.log(socket);

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

module.exports = {
  attach: function(server){
    io.attach(server)
  }
};