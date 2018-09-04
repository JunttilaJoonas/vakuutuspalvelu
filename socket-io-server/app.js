var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var redis = require('socket.io-redis');

io.adapter(redis({ host: 'localhost', port: 6379 }));

let queue = 0;
let sockets = {user: ""};
let usersocket = "";
let adminsocket = "";
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
    socket.on('INITIALIZE_ADMIN', function() {
        console.log("THIS IS ADMIN SOCKET");
        console.log(socket.id);
        adminsocket = socket.id;
    })

    socket.on('TYPING_USER', function() {
      
        io.to(adminsocket).emit('USER_IS_TYPING', usersocket);
    })

    socket.on('USER_STOPPED_TYPING', function() {
      
        io.to(adminsocket).emit('USER_STOPPED_TYPING');
    })

    socket.on('TYPING_ADMIN', function() {
      
        io.to(usersocket).emit('ADMIN_IS_TYPING');
    })

    socket.on('ADMIN_STOPPED_TYPING', function() {
      
        io.to(usersocket).emit('ADMIN_STOPPED_TYPING');
    })

    socket.on('INITIALIZE_USER_SESSION', function() {
        if(usersocket == "") {
            usersocket = socket.id
            console.log("Hello");
        let userconnect = {
            author: socket.id,
            message: 'has connected'}
        io.to(adminsocket).emit('RECEIVE_MESSAGE', userconnect);
        } else {
            queue ++;
            let userconnect = {
                author: "Vakuutusportaali",
                message: "Palvelussamme on ruuhkaa. Odottakaa hetki."
            }
            let userinqueue = {
                author: "ADMIN NOTIFICATION",
                message: "There is " + queue + "people in line"
            }
            io.to(`${socket.id}`).emit('RECEIVE_MESSAGE', userconnect);
            io.to(adminsocket).emit('RECEIVE_MESSAGE', userinqueue);
        }
    })
    socket.on('SEND_MESSAGE', function(data) {
        console.log(socket.id);
        sockets.user = socket.id;
        if(usersocket != socket.id) {
            const data2 = {
                author: 'Vakuutusportaali',
                message: 'Palvelussamme on ruuhkaa, olkaa hyvä ja odottakaa'
            }
            io.to(`${socket.id}`).emit('RECEIVE_MESSAGE', data2);
        } else {
        io.to(`${socket.id}`).emit('RECEIVE_MESSAGE', data);
        io.to(adminsocket).emit('RECEIVE_MESSAGE', data);
        }
    })

    socket.on('SEND_ADMIN_MESSAGE', function(data) {
      
        io.to(`${usersocket}`).emit('RECEIVE_MESSAGE', data);
        io.to(adminsocket).emit('RECEIVE_MESSAGE', data);
       
    })
    socket.on('disconnect', function() {
        if(socket.id == usersocket) {
        io.to(adminsocket).emit('USER_DISCONNECTED', usersocket)
        queue--;
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
