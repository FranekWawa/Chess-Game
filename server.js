import { initState } from './client/common/constants.js';

import http from 'http';
import express from 'express';
import { Server } from 'socket.io';
import path from 'path';

const __dirname = path.resolve();

const app = express();
app.use(express.static(`${__dirname}/client`));

const server = http.createServer(app);
const io = new Server(server);

let firstState = { currState: initState, whiteTurn: true };
io.on('connection', (sock) => {
    sock.emit('state', JSON.stringify(firstState));
    console.log('someone connected');
    sock.on('state', (state) => {
        sock.broadcast.emit('state', state);
        firstState = JSON.parse(state);
    });
});

server.on('error', (err) => {
    console.error(err);
});

server.listen(8080, () => {
    console.log('Server was started');
});
