var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var redis = require('socket.io-redis');

io.adapter(redis({ host: 'localhost', port: 6379 }));


let sockets = {user: ""};
let usersocket = "";
io.on('connection', (socket) => {
    let socketid = socket.id;
    console.log(socketid);
    console.log("SOCKETS");
    sockets[socketid] = socketid;
    console.log(sockets);
    socket.on('join', function (data) {
        socket.join("room");
        // We are using room of socket io
      });
    socket.on('SEND_MESSAGE', function(data) {
        console.log(socket.id);
        sockets.user = socket.id;
        console.log("THIS IS USER MESSAGE");
        console.log("SENDER SOCKETID");
        console.log(socket.id);
        console.log(sockets);
        if(usersocket != socket.id) {
            const data2 = {
                author: 'Vakuutuportaali',
                message: 'Palvelussamme on ruuhkaa, olkaa hyvä ja odottakaa'
            }
            io.to(`${socket.id}`).emit('RECEIVE_MESSAGE', data2);
        } else {
        io.to(`${socket.id}`).emit('RECEIVE_MESSAGE', data);
        }
    })

    socket.on('SEND_ADMIN_MESSAGE', function(data) {
        console.log("This is admin message");
        console.log("SENDER SOCKETID");
        console.log(data);
        console.log(usersocket);
        console.log(socket.id);
        if(usersocket == "") {
        usersocket = sockets.user;
        }
        io.to(`${usersocket}`).emit('RECEIVE_MESSAGE', data);
       
    })
    socket.on('disconnect', function() {
        if(socket.id == usersocket) {
        usersocket ="";
        }
    } )
  
});




server.listen(4001, function(){
    console.log('listening on *:4001');
 });



/*io = socket(server);
let sessiondata = "";

io.adapter(redisAdapter({host: 'localhost', port: 6370}));


io.sockets.on('connection', function (socket) {
    socket.on('join', function (data) {
      sessiondata = data.id  
      console.log(sessiondata)
      socket.join(data.id); // We are using room of socket io
    })
    socket.on('SEND_MESSAGE', function(data) {
        console.log(data.author);
        console.log(data.messageid);
        io.emit('hi', 'all sockets');
        io.sockets.in(sessiondata).emit('RECEIVE_MESSAGE', data)
    })})


console.log("SESSIONDATA" + sessiondata);

io.sockets.in(sessiondata).emit('new_msg', {msg: 'hello joonas'});

*/