import './message.scss';
import React from 'react';

function Message(props) {

  return (
    <div className='Message'>
      <h2>{props.title}</h2>
      <p>{props.text}</p>
    </div>
  );
}

export default Message;