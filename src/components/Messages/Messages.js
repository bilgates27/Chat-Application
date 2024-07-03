import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import Message from './Message/Message';

import './Messages.css';

const Messages = ({ messages, name, loading }) => (
  <ScrollToBottom className="messages">
    {loading ?
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open
      >
        <CircularProgress color="inherit"/>
        Connecting...
      </Backdrop>
      :
      messages.map((message, i) => <div key={i}><Message message={message} name={name} /></div>)
    }
  </ScrollToBottom>
);

export default Messages;