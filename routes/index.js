var express = require('express');
var router = express.Router();
var path = require('path');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
/* GET home page. */
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(2000, function(){
  console.log('listening on *:3000');
});

io.emit("some_event", { for: 'anyone' });

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    socket.emit('message', msg);
  });
});

module.exports = router;
