import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import CircularProgress from '@mui/material/CircularProgress';

import Message from './Message';
import { Box } from '@mui/material';
import WhatsApp from './share/WhatsApp';


const Messages = ({ messages, name, loading }) => (
  <ScrollToBottom className="messages">
    <div style={{ position: 'absolute', float: 'end'}}>
    {!loading && <WhatsApp textContent={"Share"}/>}
    </div>
    {loading ?
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
          <CircularProgress />
        </Box>
      :
      messages.map((message, i) => <div key={i}><Message message={message} name={name} /></div>)
    }
  </ScrollToBottom>
);

export default Messages;