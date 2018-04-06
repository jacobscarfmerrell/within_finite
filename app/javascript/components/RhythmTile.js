import React from 'react';

const RhythmTile = props => {
  let stepLis = [];
  for (let i=1; i<=props.divisor; i++) {
    let liClassName = props.className;
    if (props.selectedChordId == i && props.className.includes('rhythm-selected')) {
      liClassName += 'selected'
    }
    stepLis.push(
      <li className={liClassName} key={i} id={`${props.id}`+'-'+`${i}`} onClick={props.handleClick}>
        {i} <span className="tiny-font">/ {props.divisor}</span>
      </li>
    );
  }
  return(
    <div className="rhythm-row">
      <ul id={props.id} >
        {stepLis}
        {
          (props.id > 1 && props.deleteHandler) &&
          <i id={props.id} onClick={props.deleteHandler} className="material-icons delete-section-button">
            delete
          </i>
        }
      </ul>
    </div>
  )
}

export default RhythmTile;
