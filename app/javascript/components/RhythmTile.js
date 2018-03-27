import React from 'react';

const RhythmTile = props => {
  let row = [];
  for (let i=1; i <= props.divisor; i++) {
    row.push(<li className='step' key={i}>{i}</li>);
  }
  return(
    <ul onClick={props.handleClick} className='rhythm-row' id={`${props.id}`}>
      {row}
    </ul>
  )
}

export default RhythmTile;
