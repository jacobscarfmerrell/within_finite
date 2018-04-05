import React from 'react';
import ReactDOM from 'react-dom';

const AscendButton = props => {
  return(
    <div>
      <button id="ascend" onClick={props.handleClick} className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
        <i className="material-icons">arrow_upward</i>
      </button>
    </div>
  )
}

export default AscendButton;
