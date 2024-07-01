import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import { UserContext } from '../../context/UserContext';
import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import './Chat.css';

const ENDPOINT = process.env.REACT_APP_ENDPOINT || "http://localhost:5000/";

let socket;

const Chat = () => {
  const { user } = useContext(UserContext);
  const { name, room } = user;
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (name && room) {
      socket = io(ENDPOINT);

      socket.emit('join', { name, room }, (error) => {
        if (error) {
          alert(error);
        }
      });

      return () => {
        socket.emit('disconnect');
        socket.off();
      };
    }
  }, [name, room]);

  useEffect(() => {
    if (socket) {
      socket.on('message', (message) => {
        setMessages((messages) => [...messages, message]);
      });

      return () => {
        socket.off('message');
      };
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.on('roomData', ({ users }) => {
        console.log('Updated users:', users);  // Debugging line
        setUsers(users);
      });
  
      return () => {
        socket.off('roomData');
      };
    }
  }, [socket]);
  

  const sendMessage = (event) => {
    event.preventDefault();
  
    if (message && socket) {
      socket.emit('sendMessage', message, () => {
        setMessage('');
        socket.emit('roomData', { room });  // Request updated room data
      });
    }
  };
  

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      <TextContainer users={users} />
    </div>
  );
};

export default Chat;
