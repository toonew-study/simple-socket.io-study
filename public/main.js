/**
 * Created by Rain on 2017/3/15.
 */
$(function () {
  var $window = $(window);
  var $messageList = $('#messageList');
  var $currentInput = $('#login');

  var username;

  var socket = io();

  //这里基本就是第一次交互用了，连接之后，一次实验性通讯
  socket.on('connect', function () {
    socket.send('hello socket');

    socket.on('message', function (data) {
      console.log(data);
    })
  });

  //接受新的消息
  socket.on('new message', function (data) {
    console.log(data);
    $messageList.append(`<p><span>${data.username}</span> ： ${data.message}</p>`);
  });

  socket.on('join user', function (data) {
    $messageList.append(`<p style="width:100%;text-align: center;">新的加入者${data}</p>`);
  });

  socket.on('reconnect_error', reason => console.log(reason));

  $window.keydown(function (event) {
    // Auto-focus the current input when a key is typed
    if (!(event.ctrlKey || event.metaKey || event.altKey)) {
      $currentInput.focus();
    }
    if (event.keyCode == 13) {
      if (!username) {
        setUsername();
      } else {
        sendMessage();
      }
    }
  });


  function sendMessage() {
    var $data = $currentInput.val();
    $messageList.append(`<p style="width:100%;text-align: right">${$data}</p>`);
    $currentInput.val("");
    socket.emit('new message', {username: username, message: $data});
  }

  function setUsername() {
    $currentInput = $('#message');
    username = $('#login').val();
    $('#login-div').css("display", "none");
    socket.emit('join user', username);
  }
});