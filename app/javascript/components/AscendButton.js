import React from 'react';

const AscendButton = props => {
  return(
    <div>
      <button onClick={props.handleClick} className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
        <i className="material-icons">arrow_upward</i>
      </button>
    </div>
  )
}

export default AscendButton;
