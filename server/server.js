const initState = [
    ['rb', 'nb', 'bb', 'qb', 'kb', 'bb', 'nb', 'rb'],
    ['pb', 'pb', 'pb', 'pb', 'pb', 'pb', 'pb', 'pb'],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    ['pw', 'pw', 'pw', 'pw', 'pw', 'pw', 'pw', 'pw'],
    ['rw', 'nw', 'bw', 'qw', 'kw', 'bw', 'nw', 'rw'],
]
const http = require('http')
const express = require('express')
const app = express()
const socketio = require("socket.io")


app.use(express.static(`${__dirname}/../client`))

const server = http.createServer(app)
const io = socketio(server);

let firstState = {currState : initState, whiteTurn : true}
io.on('connection', (sock) => {
    sock.emit('state', JSON.stringify(firstState))
    console.log('someone connected')
    sock.on('state', (state) => {
        sock.broadcast.emit('state', state)
        firstState = JSON.parse(state)
    })
})

server.on('error', (err) => {
    console.error(err)
})

server.listen(8080, () => {
    console.log("Server was started")
})