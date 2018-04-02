import React from 'react';

const ChordForm = props => {
  let tones = ['R','ii','II','iii','III','iv','IV/v','V','vi','VI','vii','VII','O','ix','IX','x','X','xi','XI','xiii','XIII'];
  let toneIndices = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,20,21]
  let intervalButtons = tones.map((interval, index) => {
    let checked = false;
    if (props.selectedChord.intervals.includes(toneIndices[index])) {
      checked = true;
    }
    return(
      <div key={interval} className='note-checkbox'>
        <label htmlFor={interval}>{interval}</label>
        <input type="checkbox" id={interval} defaultChecked={checked}/>
      </div>
    )
  })
  return(
    <form className='note-container' id={props.id} onSubmit={props.handleDescend}>
      {intervalButtons}
      <input type="submit"/>
    </form>
  )
}

export default ChordForm;
