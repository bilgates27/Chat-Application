import React, { useState, useContext, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

import pfp1 from '../icons/pfp1.jpg';
import pfp2 from '../icons/pfp2.jpg';
import pfp3 from '../icons/pfp3.jpg';
import pfp4 from '../icons/pfp4.jpg';
import pfp5 from '../icons/pfp5.jpg';

const Join = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // State to track current image index
  const imgRef = useRef(null); // Ref for the image element

  const images = [pfp1, pfp2, pfp3, pfp4, pfp5];

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    setCurrentImageIndex(randomIndex);
  }

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (name && room) {
      setUser({ name, room });
      localStorage.setItem('name', name);
      localStorage.setItem('room', room);
      localStorage.setItem('photo', imgRef.current.src);
      navigate('/chat');
    }else{
      alert('fill the name and room');
    }
  };

  useEffect(() => {
    getRandomImage();
  },[]);

  const handleImageSwitching = () => {
    const newIndex = (currentImageIndex + 1) % images.length; // Calculate the next index in a circular manner
    setCurrentImageIndex(newIndex); // Update state with the new index
    imgRef.current.src = images[newIndex]; 
  };

  return (
    <div className="App">
      <div className="joinChatContainer">
        <h3>Join A Chat</h3>
        <div>
          <img onClick={handleImageSwitching} ref={imgRef} src={images[currentImageIndex]} alt="" style={{ width: "100px", height: "100px", borderRadius: "50%" }} />
          <img src="https://xsgames.co/randomusers/avatar.php?g=pixel" alt=""style={{ width: "100px", height: "100px", borderRadius: "50%" }} />
          <p onClick={handleImageSwitching}>Click the image to change profile</p>
        </div>
        <div>
          <input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} />
        </div>
        <div>
          <input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} />
        </div>
        <button className={'button mt-20'} type="submit" onClick={handleSubmit}>join</button>
      </div>
    </div>
  );
};

export default Join;
