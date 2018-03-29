import React from 'react';

const NoteTile = props => {
  let note = props.selectedNote;
  // the below will not work on its own; note.fundamental is an id not a frequency
  let fundamentalChart = [220.00,233.08,246.94,261.63,277.18,293.66,311.13,329.63,349.23,369.99,392.00,415.30];
  let fundamentalFrequency = fundamentalChart[note.fundamental-1];
  let harmonics = note.harmonics.map((harmonicAmplitude, index) => {
    let frequency = fundamentalFrequency*(index+1);
    return(
      <li key={frequency}>F: {frequency}, A: {harmonicAmplitude}</li>
    )
  });
  return(
    <div>
      {harmonics}
    </div>
  )
}

export default NoteTile;
