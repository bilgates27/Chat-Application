import React, { useState, useEffect } from 'react';
import { Avatar, Snackbar } from '@mui/material';
import ReactEmoji from 'react-emoji';

const Message = ({ message: { text, user, image }, name }) => {
  const [open, setOpen] = useState(false);
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();
  const img = localStorage.getItem('photo');

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  useEffect(() => {
    if (user === 'admin') {
      setOpen(true);
    }
  }, [user]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={5000}
        message={<div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            src={image}
            sx={{ marginRight: '10px' }}
          />
          {text}
        </div>}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      />
      {isSentByCurrentUser ? (
        <div className="messageContainer justifyEnd">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              src={img}
              sx={{ marginRight: '10px' }}
              style={{ width: '20px', height: '20px' }}
            /></div>
          <p className="sentText pr-10">{trimmedName}</p>
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
          </div>
        </div>
      ) : (
        <div className="messageContainer justifyStart">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              src={image}
              sx={{ marginRight: '10px' }}
              style={{ width: '20px', height: '20px' }}
            /></div>
          <p className="sentText pl-10">{user}</p>
          <div className="messageBox backgroundLight">
            <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Message;
