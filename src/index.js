const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const hbs = require('hbs')

const {getOldClocks, getWaterTariff, getElecTariff} = require('./tariff')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3001
// Define paths for Express configuration
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handelbars engine and views location 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {
    // server prints on terminal that someone connected
    console.log('New WebSocket connection')
    // server get tariff of water
    const tariffWater = getWaterTariff()
    // server get tariff of electricity
    const tariffElec = getElecTariff()

    const Tariffs = {
        tariffWater,
        tariffElec
    }
    // server sends data to client by emit function that runs on client side js on chat.js file
    socket.emit('message', Tariffs)
})

app.get('', (req, res) => {
    res.render('index')
})

app.get('/oldClocks', (req, res) => {
    res.render('oldClocks')
})

app.get('/aboutMe', (req, res) => {
    res.render('aboutMe')
})

app.get('/clocks', (req, res) => {
    if (!req.query.kind) {
        return res.send({
            error: 'kind of DB must be provided!'
        })
    }

    const clock = getOldClocks('./db/clocksWater.json', req.query.year, req.query.month).toString()
    // const t = clocks[0].clock.toString()
    res.send(clock)
})

// server is listenning on port 3001 
server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})