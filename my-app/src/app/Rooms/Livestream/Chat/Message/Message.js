import React from 'react';
import ReactEmoji from 'react-emoji';

import './Message.css';

const Message = ({ message: { text, user }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().split(' ');

  if(user === name.trim().toLowerCase()) {
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          {trimmedName.map((str, index) => {
            if (index > 1) {
              return (
                <>
                </>
              )
            } else if (index === 1) {
              return (
                <>
                  <p className="sentText pr-10">{str.charAt(0)}.</p>
                </>
              )
            } else {
              return (
                <>
                  <p className="sentText pr-10">{str}</p>
                </>
              )
            }
          })}
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
          </div>
        </div>
        )
        : (
          <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
              <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
            </div>
            {user.split(' ').map((str, index) => {
            if (index > 1) {
              return (
                <>
                </>
              )

            } else if (index === 1) {
              return (
                <>
                  <p className="sentText pr-10">{str.charAt(0)}.</p>
                </>
              )
            } else {
              return (
                <>
                  <p className="sentText pr-10">{str}</p>
                </>
              )
            }
          })}
          </div>
        )
  );
}

export default Message;
