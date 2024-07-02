import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { UserContext } from '../../context/UserContext';
import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import './Chat.css';

const ENDPOINT = process.env.REACT_APP_ENDPOINT;
let socket;

const Chat = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const { user } = useContext(UserContext);
  const { name, room } = user;
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!name || !room) {
      navigate('/'); // Redirect to '/' if name or room is missing
    } else {
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
  }, [name, room, navigate]);

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
