/* eslint-disable linebreak-style */
import React, { Component } from 'react';

import io from 'socket.io-client';

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import api from '../services/api';

import camera from '../assets/camera.png';
import more from '../assets/more.png';
import like from '../assets/like.png';
import liked from '../assets/liked.png';
import comment from '../assets/comment.png';
import send from '../assets/send.png';

export default class pages extends Component {
    static navigationOptions = ({ navigation }) => ({
      headerRight: (
            <TouchableOpacity style={{ marginRight: 20 }} onPress={() => navigation.navigate('New')}>
                <Image source={camera}/>
            </TouchableOpacity>
      ),
    });

    state = { // estado do componente
      feed: [],
    };

    // É invocado imediatamente após um componente ser montado (inserido na árvore).

    async componentDidMount() {
      this.registerToSocket();

      const response = await api.get('posts');

      this.setState({ feed: response.data });
    }

    registerToSocket = () => {
      const socket = io('http://192.168.100.32:3333');

      socket.on('post', (newPost) => {
        this.setState({ feed: [newPost, ...this.state.feed] }); // Adicionando o novo post no começo do array (spread operator)
      });

      socket.on('like', (likedPost) => {
        this.setState({
          feed: this.state.feed.map((post) => (post._id === likedPost._id ? likedPost : post)),
        });
      });
    }

    handleLike = (id) => {
      api.post(`/posts/${id}/like`);

      this.setState({
        feed: this.state.feed.map((post) => (post._id === id ? { ...post, liked: true } : post)),
      });
    }

    render() {
      return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.feed}
                    keyExtractor={(post) => post._id}
                    renderItem={({ item }) => (
                       <View style={styles.feedItem}>

                           <View style={styles.feedItemHeader}>
                               <View style={styles.userInfo}>
                                   <Text style={styles.name}>{item.author}</Text>
                                   <Text style={styles.place}>{item.place}</Text>
                               </View>

                               <Image source={more}/>
                           </View>

                           <Image style={styles.feedImage} source={{ uri: `http://192.168.100.32:3333/files/${item.image}` }} />

                           <View style={styles.feedItemFooter}>
                                <View style={styles.actions}>
                                    <TouchableOpacity style={styles.action} onPress={() => this.handleLike(item._id)}>
                                        <Image source={item.liked ? liked : like}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.action} onPress={() => {}}>
                                        <Image source={comment}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.action} onPress={() => {}}>
                                        <Image source={send}/>
                                    </TouchableOpacity>
                                </View>

                                <Text style={styles.likes}>{item.likes} curtidas</Text>
                                <Text style={styles.description}>{item.description}</Text>
                                <Text style={styles.hashtags}>{item.hashtags}</Text>
                           </View>

                       </View>
                    )}
                />
            </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  feedItem: {
    marginTop: 20,
    borderTopColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  feedItemHeader: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  name: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },

  place: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },

  feedImage: {
    width: '100%',
    // Without height undefined it won't work
    height: undefined,
    // figure out your image aspect ratio
    aspectRatio: 16 / 9,
    marginVertical: 20,
  },

  feedItemFooter: {
    paddingHorizontal: 20,
  },

  actions: {
    flexDirection: 'row',
    marginBottom: 15,
  },

  action: {
    marginRight: 10,
  },

  likes: {
    fontWeight: 'bold',
    color: '#000',
  },

  description: {
    lineHeight: 18,
    paddingVertical: 10,
  },

  hashtags: {
    color: '#7159c1',
    marginBottom: 10,
  },


});
