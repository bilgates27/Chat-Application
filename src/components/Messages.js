import React, { useState, useEffect } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import { CircularProgress, Box, Avatar } from '@mui/material';
import ReactEmoji from 'react-emoji';
import WhatsApp from './share/WhatsApp';

const Messages = ({ messages, name, loading }) => {
  const [adminMessage, setAdminMessage] = useState(null);

  useEffect(() => {
    const foundAdminMessage = messages.find(message => message.user === 'admin');
    if (foundAdminMessage) {
      setAdminMessage(foundAdminMessage);
      setTimeout(() => {
        setAdminMessage(null);
      }, 6000); // 6 seconds timeout
    }
  }, [messages]);

  const trimmedName = name.trim().toLowerCase();
  const img = localStorage.getItem('photo');

  return (
    <>
      <div className={adminMessage ? "statusDropDownOn" : "statusDropDownOff"}>
        {adminMessage && (
          <div className="contentWrapper">
            <img src={adminMessage.image} alt="Admin Message" style={{ width: '10px', height: '10px', borderRadius: '50%' }} />
            <div className="glowEffect">{adminMessage.text}</div>
          </div>
        )}
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
    </>
  );
};

export default Messages;
