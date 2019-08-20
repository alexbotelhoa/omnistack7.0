import React, { Component } from 'react';
import io from 'socket.io-client';
import api from '../services/api';

import more from '../assets/more.svg';
import like from '../assets/like.svg';
import liked from '../assets/liked.svg';
import comment from '../assets/comment.svg';
import send from '../assets/send.svg';

import './Feed.css';

class Feed extends Component {

    state = { //estado do componente
        feed: [],
    };

    async componentDidMount() { //É invocado imediatamente após um componente ser montado (inserido na árvore).

        this.registerToSocket();

        const response = await api.get('posts');

        this.setState({ feed: response.data });
    }

    registerToSocket = () => {
        const socket = io('http://localhost:3333');

        socket.on('post', newPost => {
            this.setState({ feed: [newPost, ...this.state.feed]}); //Adicionando o novo post no começo do array (spread operator)
        });

        socket.on('like', likedPost => {
           this.setState({
               feed: this.state.feed.map(post => post._id === likedPost._id ? likedPost : post)
           });
        });
    }

    handleLike = id => {

        this.setState({
            feed: this.state.feed.map(post => post._id === id ? {...post, liked: true} : post)
        });

        api.post(`/posts/${id}/like`);
    }

    render() {
        return (
            <section id="post-list">
                { this.state.feed.map( post => (
                    <article key={post._id}>
                        <header>
                            <div className="user-info">
                                <span>{post.author}</span>
                                <span className="place">{post.place}</span>
                            </div>

                            <img src={more} alt="Mais..."/>
                        </header>

                        <img src={`http://localhost:3333/files/${post.image}`} alt="Quarry"/>

                        <footer>
                            <div className="actions">
                                <button type="button" onClick={ () => this.handleLike(post._id) }> 
                                    <img src={post.liked ? liked : like} alt=""/>
                                </button>
                                <img src={comment} alt=""/>
                                <img src={send} alt=""/>
                            </div>

                            <strong>{post.likes} curtidas</strong>

                            <p>
                                {post.description}
                                <span>{post.hashtags}</span> 
                            </p>
                        </footer>
                    </article>
                ))}
            </section>
        );
    }
}

export default Feed;