import React from 'react';

const ChordTile = props => {
  let brights = [];
  for (let i=0;i<props.notes.length; i++) {
    let className = props.className;
    if (props.selectedNoteId == (i+1) && props.className.includes('chord-selected')) {
      className = 'selected ' + className;
    }
    if (props.notes[i].id[0]=='+') {
      brights.push(
        <li
          className={className+'chord-tile-bright'}
          id={`${props.id}`+'-'+`${props.notes[i].fundamental}`}
          key={props.notes[i].id[1]}
        >
          {props.notes[i].id[1]}
        </li>
      );
    }
  }
  let darks = [];
  for (let i=0;i<props.notes.length; i++) {
    let className = props.className;
    if (props.selectedNoteId == (i+1) && props.className.includes('chord-selected')) {
      className = 'selected ' + className
    }
    if (props.notes[i].id[0]=='-') {
      darks.push(
        <li
          className={className+'chord-tile-dark'}
          id={`${props.id}`+'-'+`${props.notes[i].fundamental}`}
          key={props.notes[i].id[1]}
        >
          {props.notes[i].id[1]}
        </li>
      );
    }
  }
  let neutrals = [];
  for (let i=0;i<props.notes.length; i++) {
    let className = props.className;
    if (props.selectedNoteId == (i+1) && props.className.includes('chord-selected')) {
      className = 'selected ' + className
    }
    if (props.notes[i].id[0]=='=') {
      neutrals.push(
        <li
          className={className+'chord-tile-neutral'}
          id={`${props.id}`+'-'+`${props.notes[i].fundamental}`}
          key={props.notes[i].id[1]}
        >
          {props.notes[i].id[1]}
        </li>
      );
    }
  }
  return(
    <ul className='chord-row' id={props.id} onClick={props.handleClick}>
      {darks}
      {neutrals}
      {brights}
    </ul>
  )
}

export default ChordTile;
