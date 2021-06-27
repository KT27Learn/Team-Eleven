import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message/Message';
import './Messages.css';

import { Typography } from '@material-ui/core';

const Messages = ({ messages, name, muteChat }) => (
  <ScrollToBottom className="messages">
    {muteChat ? (
      <>
        <Typography variant="h5"> Chat Muted</Typography>
      </>
      ) : (
      <>
        {messages.map((message, i) => <div key={i}><Message message={message} name={name}/></div>)}
      </>
    )}
    
  </ScrollToBottom>
);

export default Messages;