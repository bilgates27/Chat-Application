import React, { useState, useEffect, useContext, useRef } from 'react';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import TextContainer from './TextContainer';
import Messages from './Messages';
import InfoBar from './InfoBar';
import Input from './Input';
import { ThemeContext } from '../context/ThemeContext';
import { db } from '../config/firebase-config';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';

const ENDPOINT = process.env.REACT_APP_ENDPOINT;

const Chat = () => {
  const navigate = useNavigate();
  const { user, setUser, setError } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);

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

      socket.current.emit('join', { name, room, image }, async (error) => {
        if (error) {
          const newError = { nameError: error, roomError: '' };
          setError(newError);
          navigate('/');
        } else {
          // Fetch existing messages from Firestore
          const roomDoc = await getDoc(doc(db, "rooms", room));
          if (roomDoc.exists()) {
            const existingMessages = roomDoc.data().messages;
            const updatedMessages = existingMessages.map(msg => {
              if (msg.user === "bot" && msg.text.includes("welcome to the room")) {
                return { ...msg, text: `${name}, welcome to the room ${room}` };
              }
              return msg;
            });
            setMessages(updatedMessages);
          }
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

  const sendMessage = async (event) => {
    event.preventDefault();

    if (message && socket.current) {
      socket.current.emit('sendMessage', message, async () => {
        setMessage('');
        socket.current.emit('roomData', { room });

        // Update messages in Firestore
        if (user !== "bot") {
          // Update messages in Firestore
          const Ref = doc(db, "rooms", room);
          await setDoc(Ref, {
            messages: [...messages, { user: name, text: message, image }]
          }, { merge: true });
        }
      });
    }
  };

  const deleteMessages = async () => {
    const Ref = doc(db, "rooms", room);
    await updateDoc(Ref, {
      messages: []
    });

    // Add the welcome message again
    const welcomeMessage = { user: "bot", text: `${name}, welcome to the room ${room}`, image: '' };
    await setDoc(Ref, {
      messages: [welcomeMessage]
    }, { merge: true });

    setMessages([welcomeMessage]);
    navigate('./');
  };

  return (
    <div className={theme ? "outerContainer" : "outerContainer outerContainerDark"}>
      <div className="container">
        <InfoBar room={user.room} users={users} name={user.name} image={image} deleteMessages={deleteMessages} />
        <Messages messages={messages} name={user.name} loading={loading} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      <TextContainer users={users} />
    </div>
  );
};

export default Chat;
