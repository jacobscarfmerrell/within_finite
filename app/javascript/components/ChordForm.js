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
        <div key={interval} className="note-inner-container">
          <fieldset className={"note-checkbox note-checkbox-"+toneIndices[index]}>
            <input id={toneIndices[index]} type="checkbox" name={'checkbox'+toneIndices[index]} defaultChecked={checked} />
            <label htmlFor={toneIndices[index]} className={"note-checkbox note-checkbox-"+toneIndices[index]}>
              <span>{interval}</span>
            </label>
          </fieldset>
        </div>
    )
  })
  return(
    <form className='note-container' id={props.id} onSubmit={props.handleDescend}>
      {intervalButtons}
      <div>
        <button type="submit"><i className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent material-icons">save</i></button>
      </div>
    </form>
  )
}

export default ChordForm;
