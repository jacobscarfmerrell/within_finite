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
        {i}
      </li>
    );
  }
  return(
    <ul className="rhythm-row" id={props.id} >
      {stepLis}
    </ul>
  )
}

export default RhythmTile;
