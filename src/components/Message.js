import React, { useState, useEffect } from 'react';
import { Box, Snackbar } from '@mui/material';
import ReactEmoji from 'react-emoji';

const Message = ({ message: { text, user }, name }) => {
  const [open, setOpen] = useState(false);
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

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
        message={text}
      />
      {isSentByCurrentUser ? (
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10">{trimmedName}</p>
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
          </div>
        </div>
      ) : (
        <div className="messageContainer justifyStart">
          <div className="messageBox backgroundLight">
            <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
          </div>
          <p className="sentText pl-10">{user}</p>
        </div>
      )}
    </>
  );
};

export default Message;
