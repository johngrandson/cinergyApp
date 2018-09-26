const path = require('path');
const express = require('express');
const http = require('http');
const SocketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = SocketIo.listen(server);

// static files
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.get('/api', (req, res) => {
    res.sendFile('public/index.html');
});

const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;
const parser = new Readline();

const mySerial = new SerialPort('/dev/ttyUSB0', {
    baudRate: 9600
});

mySerial.pipe(parser);

mySerial.on('open', function () {
    console.log('Opened Port.');
});

mySerial.on('data', (data) => {
    let convertedData = data.toString();

    convertedData = parseFloat(convertedData * 210);

    console.log(convertedData);
    io.emit('arduino:data', {
        value: convertedData
    });
});

mySerial.on('err', function (data) {
    console.log(err.message);
});

server.listen(3000, () => {
    console.log('Server on port 3000');
});