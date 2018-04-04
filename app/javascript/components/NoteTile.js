import React from 'react';
import Tone from 'tone';

const NoteTile = props => {
  let partialsSliders = props.selectedChord.partials.map((partial,index) => {
    return(
      <div key={index}>
        <label htmlFor={index}>{index+1}</label>
        <input className="mdl-slider mdl-js-slider" onChange={props.handleChange} type="range" id={index} defaultValue={partial} min='0.0' max='1.0' step="0.001"/>
      </div>
    )
  })
  return(
    <div>
      {partialsSliders}
    </div>
  )
}

export default NoteTile;
