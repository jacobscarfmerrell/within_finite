import React from 'react';

const ChordTile = props => {
  let brightRow = [];
  let darkRow = [];
  let brightTones = ['Root','5','2','6','3','7'];
  let darkTones = ['TT','4','7','3','6','2'];
  for (let i=0; i < brightTones.length; i++) {
    brightRow.push(<li className='chord-tone chord-tone-bright' id={'b.'+i} key={i}>{brightTones[i]}</li>);
  }
  for (let i=0; i < darkTones.length; i++) {
    darkRow.push(<li className='chord-tone chord-tone-dark' id={'d.'+i} key={i}>{darkTones[i]}</li>);
  }
  return(
    <div className="chord-table" id={props.id} onClick={props.handleClick}>
      <ul className='chord-row'>
        {brightRow}
      </ul>
      <ul className='chord-row'>
        {darkRow}
      </ul>
    </div>
  )
}

export default ChordTile;
