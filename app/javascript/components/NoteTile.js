import React from 'react';
import Tone from 'tone';

const NoteTile = props => {
  let partialsSliders = props.selectedChord.partials.map((partial,index) => {
    return(
    <input onChange={props.handleChange} type="range" key={index} id={index} defaultValue={partial} min='0.0' max='1.0' step="0.1"/>
    )
  })
  return(
    <div>
      {partialsSliders}
    </div>
  )
}

export default NoteTile;
