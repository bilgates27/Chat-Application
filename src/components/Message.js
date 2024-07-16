import React, { useState, useEffect } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import { CircularProgress, Box, Avatar, Snackbar } from '@mui/material';
import ReactEmoji from 'react-emoji';
import WhatsApp from './share/WhatsApp';

const Messages = ({ messages, name, loading, status }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const adminMessage = messages.find(message => message.user === 'admin');
    if (adminMessage) {
      setOpen(true);
    }
  }, [messages]);

  const handleClose = () => {
    setOpen(false);
  };

  const trimmedName = name.trim().toLowerCase();
  const img = localStorage.getItem('photo');

  return (
    <>
      <div className={status ? "statusDropDownOn" : "statusDropDownOff"}>
        <div className="glowEffect"></div>
      </div>
      <ScrollToBottom className="messages">
        <div style={{ position: 'absolute', float: 'end' }}>
          {!loading && <WhatsApp textContent={"Share"} />}
        </div>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
            <CircularProgress />
          </Box>
        ) : (
          messages.map((message, i) => {
            const isSentByCurrentUser = message.user === trimmedName;

            return (
              <div key={i} className="messageContainer" style={{ justifyContent: isSentByCurrentUser ? 'flex-end' : 'flex-start' }}>
                {isSentByCurrentUser ? (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar
                        src={img}
                        sx={{ marginRight: '10px' }}
                        style={{ width: '20px', height: '20px' }}
                      />
                      <p className="sentText pr-10">{trimmedName}</p>
                    </div>
                    <div className="messageBox backgroundBlue">
                      <p className="messageText colorWhite">{ReactEmoji.emojify(message.text)}</p>
                    </div>
                  </>
                ) : (
                  <>
                    {message.user !== 'admin' && message.user !== 'bot' && (
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar
                          src={message.image}
                          sx={{ marginRight: '10px' }}
                          style={{ width: '20px', height: '20px' }}
                        />
                        <p className="sentText pr-10">{message.user}</p>
                      </div>
                    )}
                    {message.user !== 'admin' && (
                      <div className={`${message.user === 'bot' ? "messageBox bot" : "messageBox backgroundLight"}`}>
                        <p className="messageText colorDark">{ReactEmoji.emojify(message.text)}</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })
        )}
      </ScrollToBottom>
      {open && (
        <Snackbar
          open={open}
          onClose={handleClose}
          autoHideDuration={5000}
          message={<div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              src={messages.find(message => message.user === 'admin')?.image}
              sx={{ marginRight: '10px' }}
            />
            {messages.find(message => message.user === 'admin')?.text}
          </div>}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        />
      )}
    </>
  );
};

export default Messages;
