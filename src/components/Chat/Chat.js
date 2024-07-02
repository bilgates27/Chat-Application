import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import './Chat.css';

const ENDPOINT = "http://localhost:5000";

let socket;

const Chat = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const name = localStorage.getItem('name');
    const room = localStorage.getItem('room');

    if (!name || !room) {
      navigate('/');
    } else {
      setUser({ name, room }); // Update context with retrieved values
      socket = io(ENDPOINT);

      socket.emit('join', { name, room }, (error) => {
        if (error) {
          alert(error);
        }
      });

      return () => {
        socket.disconnect();
        socket.off();
      };
    }
  }, [navigate, setUser]);

  useEffect(() => {
    const handleNewMessage = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    const handleRoomData = ({ users }) => {
      setUsers(users);
    };

    if (socket) {
      socket.on('message', handleNewMessage);
      socket.on('roomData', handleRoomData);

      return () => {
        socket.off('message', handleNewMessage);
        socket.off('roomData', handleRoomData);
      };
    }
  }, []);

  const sendMessage = (event) => {
    const room = localStorage.getItem('room');
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
        <InfoBar room={user.room} />
        <Messages messages={messages} name={user.name} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      <TextContainer users={users} />
    </div>
  );
};

export default Chat;
