
var io = module.exports.io = require('socket.io')(app)

const PORT = process.env.PORT || 3231

const SocketManager = require('../../vakuutuspalvelin/SocketManager')

io.on('connection', SocketManager)

app.listen(PORT, () => {
    console.log("COnnected to port" + PORT)
})