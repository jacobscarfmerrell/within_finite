import React from 'react';

const ChordTile = props => {
  let tones = ['R','ii','II','iii','III','iv','IV/v','V','vi','VI','vii','VII','O','ix','IX','x','X','xi','XI','xiii','XIII'];
  let toneIndices = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,20,21]

  let chordRow = props.intervals.map((interval) => {
    let toneIndex = toneIndices.findIndex(function(element) {
      return element == interval
    })
    return(
      <li className="note-cell mdl-button mdl-button--raised mdl-button--accent " key={interval}>{tones[toneIndex]}</li>
    )
  })
  if (chordRow.length == 0) {
    chordRow.push(
      <li key="noChord" className="note-cell mdl-button mdl-button--raised mdl-button--accent ">None</li>
    )
  }
  return(
    <ul className="note-container">
      {chordRow}
    </ul>
  )
}

export default ChordTile;
