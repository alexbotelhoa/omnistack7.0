/* eslint-disable linebreak-style */

const sharp = require('sharp'); // importando depêndência sharp para redimensionar as imagens
const path = require('path'); // importando biblioteca path do node
const fs = require('fs'); // importando biblioteca filesystem do node
const Post = require('../models/Post'); // importando o model Post

module.exports = {
  async index(req, res) {
    const posts = await Post.find().sort('-createdAt');

    return res.json(posts);
  },

  async store(req, res) {
    const {
      author, place, description, hashtags,
    } = req.body; // Pegando os dados da requisição

    // Pegando o filename do arquivo da requisição e jogando na const image

    const { filename: image } = req.file;

    const [name] = image.split('.'); // Separando nome do arquivo da extensão
    const fileName = `${name}.jpg`; // Adicionando extensão jpg ao nome do arquivo

    await sharp(req.file.path) // Redimensionando a imagem com sharp (passando o caminho da imagem)
      .resize(500) // Tamanho da imagem
      .jpeg({ quality: 70 }) // Formato e qualidade 70%
      .toFile( // Caminho a ser salva
        path.resolve(req.file.destination, 'resized', fileName), // Pasta resized, dentro da pasta uploadscom o nome fileName
      );

    fs.unlinkSync(req.file.path); // Excluindo a imagem original de uploads

    const post = await Post.create({
      author,
      place,
      description,
      hashtags,
      image: fileName, // Nome da imagem com nova extensão
    });

    req.io.emit('post', post); // Emite para todos os usuários da aplicação a informação do novo post

    return res.json(post);
  },
};
