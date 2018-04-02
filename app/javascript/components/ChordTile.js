import React from 'react';

const ChordTile = props => {
  let chordRow = props.intervals.map(interval => {
    return(
      <li className="note-cell" key={interval}>{interval}</li>
    )
  })
  return(
    <ul className="note-container">
      {chordRow}
    </ul>
  )
}

export default ChordTile;
