import React, { useState, useEffect, useContext, useRef } from 'react';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import TextContainer from './TextContainer';
import Messages from './Messages';
import InfoBar from './InfoBar';
import Input from './Input';

const ENDPOINT = process.env.REACT_APP_ENDPOINT;

const Chat = () => {
  const navigate = useNavigate();
  const { user, setUser, setError } = useContext(UserContext);

  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const name = localStorage.getItem('name');
  const room = localStorage.getItem('room');
  const image = localStorage.getItem('photo');
  const socket = useRef(null);
  
  useEffect(() => {
    if (!name || !room) {
      navigate('/');
    } else {
      setUser({ name, room, image });
      socket.current = io(ENDPOINT);

      socket.current.emit('join', { name, room, image }, (error) => {
        if (error) {
          const newError = { nameError: error, roomError: '' };
          setError(newError);
          navigate('/');
        } else {
          setLoading(false);
        }
      });

      return () => {
        socket.current.disconnect();
        socket.current.off();
      };
    }
  }, [name, room, image, navigate, setUser, setError]);

  useEffect(() => {
    const handleNewMessage = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    const handleRoomData = ({ users }) => {
      setUsers(users);
    };

    if (socket.current) {
      socket.current.on('message', handleNewMessage);
      socket.current.on('roomData', handleRoomData);

      return () => {
        socket.current.off('message', handleNewMessage);
        socket.current.off('roomData', handleRoomData);
      };
    }
  }, []);
  
  const sendMessage = (event) => {
    event.preventDefault();
    
    if (message && socket.current) {
      socket.current.emit('sendMessage', message, () => {
        setMessage('');
        socket.current.emit('roomData', { room });
      });
    }
  };


  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={user.room} users={users} name={user.name} image={image} />
        <Messages messages={messages} name={user.name} loading={loading} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      <TextContainer users={users} />
    </div>
  );
};

export default Chat;
