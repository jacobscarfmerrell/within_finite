import React from 'react';

const AscendButton = props => {
  return(
    <div>
      <button className="foo-button mdc-button" onClick={props.handleClick}>
        Ascend a Level
      </button>
    </div>
  )
}

export default AscendButton;
