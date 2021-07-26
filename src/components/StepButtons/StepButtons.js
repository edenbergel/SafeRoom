import React from 'react';
import  './stepbuttons.scss'

function StepButtons(props) {

  console.log(props.prev);

  return (
    <div className="step_buttons">
      { props.prev === null ? 
        "" : <button className="step_buttons_prev" onClick={() => window.location.assign('/' + props.prev)}>Étape précedente</button> 
      }
      { props.next === null ? 
        "" : <button className="step_buttons_next" onClick={() => window.location.assign('/' + props.next)}>Étape suivante</button> 
      }
    </div>
  )
}

export default StepButtons;