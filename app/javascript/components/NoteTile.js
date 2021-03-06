import React from 'react';
import Tone from 'tone';

const NoteTile = props => {
  let partialsSliders = props.selectedChord.partials.map((partial,index) => {
    return(
      <div key={index}>
        <label htmlFor={index}>{index+1}</label>
        <input className="partial-sliders" onChange={props.handleChange} type="range" id={index} defaultValue={partial} min='0.0' max='1.0' step="0.001"/>
      </div>
    )
  })
  return(
    <div className="partial-sliders-container">
      {partialsSliders}
    </div>
  )
}

export default NoteTile;
