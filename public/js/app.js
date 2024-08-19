
const socket = io()

const players = {}

socket.on('updatePlayers', (data) => {
    players = data
    }
)

socket.on('ticker', (data) => {
    console.log(data)
    }
)

socket.on('announce', (data) => {
    console.log(data)
    }
)

socket.on('connect', () => {
    console.log('Connected to server')
    }
)

socket.on('disconnect', () => {
    console.log('Disconnected from server')
    }
)

socket.on('reconnect', () => {
    console.log('Reconnected to server')
    }
)

