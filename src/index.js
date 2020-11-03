const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3001
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {
    // server prints on terminal that someone connected
    console.log('New WebSocket connection')
    // server get tariff of water
    const tariffWater = 335
    // server get tariff of electricity
    const tariffElec = 445

    const Tariffs = {
        tariffWater,
        tariffElec
    }
    // server sends data to client by emit function that runs on client side js on chat.js file
    socket.emit('message', Tariffs)
})

// app.get('/wow', (req, res) => {
//     res.render('index', {
//         title: 'avshalom!!'
//     })
// })

// server is listenning on port 3001 
server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})