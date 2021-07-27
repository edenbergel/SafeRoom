import './message.scss';
import React from 'react';

function Message(props) {

  return (
    <div className='Message'>
      <h2>{props.title}</h2>
      <p>{props.text}</p>
      <p>{props.step}</p>
    </div>
  );
}

export default Message;