# InstaRocket

Projeto desenvolvido durante a semana omnistack 7.0 da <a href="https://rocketseat.com.br/">RocketSeat</a> utilizando as tecnologias NodeJS, ReactJS e React Native.

A Aplicação desenvolvida foi um "clone" do Instagram onde os usuários podem fazer upload de fotos, visualizar e dar "like" em todos os posts.

## Back-end

Com NodeJS e Express no backend foi criado um servidor e uma API, utilizando o conceito de API REST, que se comunica com um banco de dados MongoDB e retorna os dados para o front-end.

Também foi utilizada a biblioteca Socket-io para comunicação em tempo real do servidor com os clientes da aplicação web e mobile.

As rotas da api são:

* /post (GET) - Retorna todos os posts 
* /post (POST) - Insere um novo post no banco
* /post/:id/like (POST) - Adiciona 1 like ao post pelo id e salva no banco

## Front-end

A aplicação web foi desenvolvida com ReactJS, na página principal é exibido o feed com todos os posts.

Cada post exibe o autor, local, imagem, descrição da foto e também as hashtags.

![image](https://user-images.githubusercontent.com/42618124/63376943-52379b80-c365-11e9-8e60-613741455a4e.PNG)

Ao clicar no ícone da câmera, o usuário é redirecionado para o formulário de envio de novos posts, onde é feito o upload da imagem e preenchidos os dados do post.

![image](https://user-images.githubusercontent.com/42618124/63376978-67acc580-c365-11e9-99ef-f59cafa47bcf.PNG)

O app mobile foi desenvolvido com React Native e segue o mesmo estilo da aplicação web com uma tela exibindo feed com os posts e outra para envio de novos posts.

No aplicativo, é possível tanto fazer o upload da imagem diretamente da galeria, quanto tirar uma nova foto com a câmera.

![image](https://user-images.githubusercontent.com/42618124/63377012-7abf9580-c365-11e9-9c9f-43777031770b.png)

Utilizando a biblioteca Socket-io-client, o aplicativo web e o mobile recebem do servidor em tempo real uma mensagem sempre que um novo post é adicionado ou curtido e o feed é atualizado automaticamente.
