import React, { useState, useContext, useRef, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';
import { Avatar, Backdrop, Button, Chip, CircularProgress, Stack } from '@mui/material';
import CameraswitchOutlinedIcon from '@mui/icons-material/CameraswitchOutlined';
import axios from 'axios'; // Import axios

import pfp1 from '../icons/pfp1.jpg';
import pfp2 from '../icons/pfp2.jpg';
import pfp3 from '../icons/pfp3.jpg';
import pfp4 from '../icons/pfp4.jpg';
import pfp5 from '../icons/pfp5.jpg';
import { RoomContext } from '../context/RoomContext';

const images = [pfp1, pfp2, pfp3, pfp4, pfp5]; // Move images outside the component

const Join = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [open, setOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // State to track current image index
  const imgRef = useRef(null); // Ref for the image element
  const { allRooms } = useContext(RoomContext);


  const getRandomImage = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * images.length);
    setCurrentImageIndex(randomIndex);
  }, []);

  const { setUser, error, setError } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setOpen(true);
    if (name && room) {
      try {
        const response = await axios.post(`${process.env.REACT_APP_ENDPOINT}/check-username`, { name, room });
        if (response.data.available) {
          setUser({ name, room });
          localStorage.setItem('name', name);
          localStorage.setItem('room', room);
          localStorage.setItem('photo', imgRef.current.src);
          navigate('/chat');
          setOpen(false);
          setError('');
        } else {
          setOpen(false);
          setError({ nameError: 'The username is taken.' });
        }
      } catch (err) {
        setOpen(false);
        console.error(err);
        setError({ nameError: 'An error occurred. Please try again.' });
      }
    } else {
      setOpen(false);
      let newError = { nameError: '', roomError: '' };
      if (name === '') {
        newError.nameError = 'Enter a name';
      }
      if (room === '') {
        newError.roomError = 'Enter a room';
      }
      setError(newError);
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

  return (
    <div className="App">
      <div className="joinChatContainer">
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="success" />
        </Backdrop>
        <h3>Join A Chat</h3>
        <div onClick={handleImageSwitching}>
          <img ref={imgRef} src={images[currentImageIndex]} alt="" style={{ width: "100px", height: "100px", borderRadius: "50%" }} />
          <CameraswitchOutlinedIcon />
        </div>
        <div>
          <Box>
            <CustomTextField
              error={!!error.nameError}
              placeholder="Name"
              id="standard-error-helper-text"
              label="Name"
              value={name}
              helperText={error.nameError}
              variant="standard"
              onChange={(e) => setName(e.target.value)}
            />
          </Box><br />
          <Box>
            <CustomTextField
              error={!!error.roomError}
              placeholder="Room"
              id="standard-error-helper-text"
              label="Room"
              value={room}
              helperText={error.roomError}
              variant="standard"
              onChange={(e) => setRoom(e.target.value)}
            />
          </Box>
        </div><br />
        <Stack spacing={2}>
          <Button variant={error.nameError || error.roomError ? "outlined" : "contained"} color={error.nameError || error.roomError ? "error" : "success"} type="submit" onClick={handleSubmit}>
            Join
          </Button>
          <div className="room-container">
            {allRooms.map((room, index) => (
              <Link to={`/chat/${room}`} key={index} className="room-link">
                <div className="room-item">
                  <Stack direction="row" spacing={1}>
                    <Chip
                      avatar={<Avatar>{room[0].toUpperCase()}</Avatar>}
                      label={room?.toUpperCase()}
                      variant="outlined"
                    />
                  </Stack>
                </div>
              </Link>
            ))}
          </div>
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
