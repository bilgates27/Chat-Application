import React, { useState, useEffect, useContext } from 'react';
import { Snackbar } from '@mui/material';
import ReactEmoji from 'react-emoji';
import { ThemeContext } from '../context/ThemeContext';

const Message = ({ message: { text, user, image }, name }) => {
  const [open, setOpen] = useState(false);
  const [isWelcomeMessage, setIsWelcomeMessage] = useState(false);

  const trimmedName = name.trim().toLowerCase();
  const svgAvatar = localStorage.getItem('photo');
  const { theme } = useContext(ThemeContext);

  const isSentByCurrentUser = user === trimmedName;

  useEffect(() => {
    if (user === 'bot' && text.includes('welcome to the room')) {
      setIsWelcomeMessage(true);
      setOpen(true);
    } else if (user === 'admin' || user === 'bot') {
      setOpen(true);
    }
  }, [user, text]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={isWelcomeMessage ? 10000 : 5000}
        message={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div dangerouslySetInnerHTML={{ __html: image }} style={{ width: '20px', height: '20px', marginRight: '10px' }}></div>
            {text}
          </div>
        }
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        ContentProps={{
          style: isWelcomeMessage ? { backgroundColor: 'lightblue', color: 'darkblue' } : {}
        }}
      />
      {isSentByCurrentUser ? (
        <div className="messageContainer justifyEnd">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div dangerouslySetInnerHTML={{ __html: svgAvatar }} style={{ width: '20px', height: '20px', marginRight: '10px' }} />
            <p className="sentText pr-10">{trimmedName}</p>
          </div>
          <div className={theme ? "messageBox backgroundBlue" : "messageBox messageDark"}>
            <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
          </div>
        </div>
      ) : (
        <div className="messageContainer justifyStart">
          {user !== 'admin' && user !== 'bot' &&
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div dangerouslySetInnerHTML={{ __html: image }} style={{ width: '20px', height: '20px', marginRight: '10px' }} />
              <p className="sentText pr-10">{user}</p>
            </div>
          }
          {user !== 'admin' &&
            <div className={`${user === 'bot' ? (theme ? 'messageBox bot' : 'messageBox botDark') : 'messageBox backgroundLight'}`}>
              <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
            </div>}
        </div>
      )}
    </>
  );
};

export default Message;
