
const express = require('express')
const app = express()

// Setup socket.io
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server, { pingInterval: 2000, pingTimeout: 5000 })

const port = 3000

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

const players = {}

// We need to add a Telepathic-Blurb here that will output certain information to all users, based on events that happen in the game.
// When a user connects, disconnects, dies, or wins, we need to output a message to all users.

io.on('connection', (socket) => {
    console.log('a user connected')
    io.emit('updatePlayers', players)

    // when player disconnects
    socket.on('disconnect', (reason) => {
        console.log(reason)
        delete players[socket.id]
        io.emit('updatePlayers', players)
    })

    // Start the game
    socket.on('initGame', (data) => {
        players[socket.id] = data
        io.emit('updatePlayers', players)
    })

    // Announce information to all players
    socket.on('announce', (data) => {
        io.emit('announce', data)
    })

    // Ticker for the game, this should keep timing in sync and update all players with the latest information.
    setInterval(() => {
        io.emit('ticker', players)
        io.emit('updatePlayers', players)
    }, 1000)

    server.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    })
})
console.log('listening on *:3000')
console.log(`Server started on port ${port}`)
app.get('/', (req, res) => {
    res.sendFile('./index.html')
})