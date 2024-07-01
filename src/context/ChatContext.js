import React, { createContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import io from 'socket.io-client';

export const ChatContext = createContext();

const ENDPOINT = 'http://localhost:5000/';

export const ChatProvider = ({ children }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    const socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit('join', { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });

    return () => {
      socket.disconnect(); // Disconnect socket properly
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    const socket = io(ENDPOINT);

    socket.on('message', message => {
      setMessages(messages => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });

    return () => {
      socket.disconnect(); // Disconnect socket properly
      socket.off('message');
      socket.off('roomData');
    };
  }, [ENDPOINT]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      const socket = io(ENDPOINT);
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  return (
    <ChatContext.Provider value={{ name, room, users, message, messages, setMessage, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
};
