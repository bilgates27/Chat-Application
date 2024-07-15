import React, { useState, useContext, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import pfp1 from '../../icons/pfp1.jpg';
import pfp2 from '../../icons/pfp2.jpg';
import pfp3 from '../../icons/pfp3.jpg';
import pfp4 from '../../icons/pfp4.jpg';
import pfp5 from '../../icons/pfp5.jpg';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';
import { Button, Stack } from '@mui/material';
import CameraswitchOutlinedIcon from '@mui/icons-material/CameraswitchOutlined';
import axios from 'axios'; // Import axios

const images = [pfp1, pfp2, pfp3, pfp4, pfp5];

const SharedLink = () => {
  const [username, setUsername] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imgRef = useRef(null);
  const { setUser, error, setError } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const roomURL = `${location.pathname.split('/')[2]}`;

  const handleSubmit = async () => {
    if (username && roomURL) {
      try {
        const response = await axios.post(`${process.env.REACT_APP_ENDPOINT}/check-username`, { name: username, room: roomURL });
        if (response.data.available) {
          setUser({ username, roomURL });
          localStorage.setItem('name', username);
          localStorage.setItem('room', roomURL);
          localStorage.setItem('photo', imgRef.current.src);
          navigate('/chat');
          setError('');
        } else {
          setError({ nameError: 'The username is taken.' });
        }
      } catch (err) {
        console.error(err);
        setError({ nameError: 'An error occurred. Please try again.' });
      }
    } else {
      setError({ nameError: 'Enter a name' });
    }
  };

  const handleImageSwitching = () => {
    const newIndex = (currentImageIndex + 1) % images.length;
    setCurrentImageIndex(newIndex);
    imgRef.current.src = images[newIndex];
  };

  useEffect(() => {
    console.log(roomURL);
  }, [roomURL]);

  return (
    <div className="App">
      <div className="joinChatContainer">
        <h3>Join A Chat</h3>
        <div onClick={handleImageSwitching}>
          <img
            ref={imgRef}
            src={images[currentImageIndex]}
            alt=""
            style={{ width: '100px', height: '100px', borderRadius: '50%' }}
          />
          <CameraswitchOutlinedIcon />
        </div>
        <div>
          <Box>
            <CustomTextField
              error={!!error.nameError}
              placeholder="username"
              id="standard-error-helper-text"
              label="Name"
              value={username}
              helperText={error.nameError}
              variant="standard"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Box>
        </div>
        <br />
        <Stack spacing={2}>
          <Button
            variant={error.nameError || error.roomError ? 'outlined' : 'contained'}
            color={error.nameError || error.roomError ? 'error' : 'success'}
            type="submit"
            onClick={handleSubmit}
          >
            Join
          </Button>
        </Stack>
      </div>
    </div>
  );
};

export default SharedLink;

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
  },
}));
