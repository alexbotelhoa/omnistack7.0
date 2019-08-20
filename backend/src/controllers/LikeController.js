/* eslint-disable linebreak-style */
const Post = require('../models/Post'); // importando o model Post

module.exports = {


  async store(req, res) {
    const post = await Post.findById(req.params.id); // Pegando post do banco pelo id

    post.likes += 1; // Adicionando um like
    post.liked = true;

    await post.save(); // Salvando no banco

    req.io.emit('like', post); // Emite para todos os usuários da aplicação a informação do post com o novo like

    return res.json(post);
  },
};
