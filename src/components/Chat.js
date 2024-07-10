import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import TextContainer from './TextContainer';
import Messages from './Messages';
import InfoBar from './InfoBar';
import Input from './Input';

const ENDPOINT = process.env.REACT_APP_ENDPOINT;

let socket;

const Chat = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  const name = localStorage.getItem('name');
  const room = localStorage.getItem('room');
  const image = localStorage.getItem('photo');

  useEffect(() => {
    if (!name || !room) {
      navigate('/');
    } else {
      setUser({ name, room, image }); // Update context with retrieved values
      socket = io(ENDPOINT);

      socket.emit('join', { name, room, image }, (error) => {
        if (error) {
          alert(error); // Show error message
        } else {
          setLoading(false); // Update loading state once joined successfully
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
        <InfoBar room={user.room} users={users} name={user.name} image={image} />
        <Messages messages={messages} name={user.name} loading={loading}/>
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      <TextContainer users={users} />
    </div>
  );
};

export default Chat;
