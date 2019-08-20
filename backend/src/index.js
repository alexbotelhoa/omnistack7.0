/* eslint-disable linebreak-style */
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors'); // Permite que outras aplicações acessem o backend

const app = express();

const server = require('http').Server(app); // Permite que a aplicação trabalhe com o protocolo http
const io = require('socket.io')(server); // Permite que a aplicação trabalhe com websockets (real time)

mongoose.connect('mongodb://username:password@host:port/database?options...', { useNewUrlParser: true });

app.use((req, res, next) => { // Permitindo que io seja acessível em toda aplicação
  req.io = io;

  next();
});

app.use(cors());

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized'))); // Permite que o front end acesse as imagens na pasta resized através da rota /files

app.use(require('./routes')); // Chamando o arquivode rotas

server.listen(3333);
