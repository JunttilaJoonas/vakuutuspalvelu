var express = require('express');
var socket = require('socket.io');

var app = express();


server = app.listen(4001, function(){
    console.log('Server is running on port 4001')
});

io = socket(server);

io.on('connection', (socket) => {
    socket.on('SEND_MESSAGE', function(data){
        io.emit('RECEIVE_MESSAGE', data);
    })
})