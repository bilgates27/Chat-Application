import React, { useState, useContext, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';
import { Button, Stack } from '@mui/material';
import CameraswitchOutlinedIcon from '@mui/icons-material/CameraswitchOutlined';

import pfp1 from '../icons/pfp1.jpg';
import pfp2 from '../icons/pfp2.jpg';
import pfp3 from '../icons/pfp3.jpg';
import pfp4 from '../icons/pfp4.jpg';
import pfp5 from '../icons/pfp5.jpg';

const images = [pfp1, pfp2, pfp3, pfp4, pfp5]; // Move images outside the component

const Join = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // State to track current image index
  const imgRef = useRef(null); // Ref for the image element

  const getRandomImage = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * images.length);
    setCurrentImageIndex(randomIndex);
  }, []);

  const { setUser, error, setError } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (name && room) {
      setUser({ name, room });
      localStorage.setItem('name', name);
      localStorage.setItem('room', room);
      localStorage.setItem('photo', imgRef.current.src);
      if (!error) return navigate('/chat');
    } else {
      setError('Enter a name');
    }
  };

  useEffect(() => {
    getRandomImage();
  }, [getRandomImage]);

  const handleImageSwitching = () => {
    const newIndex = (currentImageIndex + 1) % images.length; // Calculate the next index in a circular manner
    setCurrentImageIndex(newIndex); // Update state with the new index
    imgRef.current.src = images[newIndex];
  };

  const validateName = (value) => {
    if (!value) {
      setError('Name is required');
    } else if (value.length < 3) {
      setError('Name must be at least 3 characters');
    } else {
      setError('');
    }
  };

  const handleNameChange = (event) => {
    const { value } = event.target;
    setName(value);
    validateName(value);
  };

  const validateRoom = (value) => {
    if (!value) {
      setError('Room is required');
    } else {
      setError('');
    }
  };

  const handleRoomChange = (event) => {
    const { value } = event.target;
    setRoom(value);
    validateRoom(value);
  };

  return (
    <div className="App">
      <div className="joinChatContainer">
        <h3>Join A Chat</h3>
        <div onClick={handleImageSwitching}>
          <img ref={imgRef} src={images[currentImageIndex]} alt="" style={{ width: "100px", height: "100px", borderRadius: "50%" }} />
          <CameraswitchOutlinedIcon />
        </div>
        <div>
          <Box>
            <CustomTextField
              error={error !== ''}
              placeholder="Name"
              id="standard-error-helper-text"
              label="Name"
              value={name}
              helperText={error}
              variant="standard"
              onChange={handleNameChange}
            />
          </Box><br />
          <Box>
            <CustomTextField
              error={error !== ''}
              placeholder="Room"
              id="standard-error-helper-text"
              label="Room"
              value={room}
              helperText={"Enter a room"}
              variant="standard"
              onChange={handleRoomChange}
            />
          </Box>
        </div><br />
        <Stack spacing={2}>
          <Button variant={`${error ? "outlined" : "contained"}`} color={`${error ? "error" : "success"}`} type="submit" onClick={handleSubmit}>
            Join
          </Button>
        </Stack>
      </div>
    </div>
  );
};

export default Join;

const CustomTextField = styled(TextField)(({ theme, error }) => ({
  '& .MuiInput-underline:before': {
    borderBottomColor: error ? 'red' : 'green', // Normal state
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: error ? 'red' : 'green', // Focused state
  },
  '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
    borderBottomColor: error ? 'red' : 'green', // Hover state
  },
  '& .MuiInputLabel-root': {
    color: 'white', // Label color
  },
  '& .MuiInputBase-input': {
    color: 'white', // Input text color
  }
}));

