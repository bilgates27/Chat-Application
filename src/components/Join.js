import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Join = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (name && room) {
      setUser({ name, room });
      localStorage.setItem('name', name);
      localStorage.setItem('room', room);
      navigate('/chat');
    }
  };

  return (
    <div className="App">
      <div className="joinChatContainer">
      <h3>Join A Chat</h3>
        <div>
          <input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} />
        </div>
        <div>
          <input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} />
        </div>
        <button className={'button mt-20'} type="submit" onClick={handleSubmit}>Sign In</button>
      </div>
    </div>
  );
};

export default Join;
