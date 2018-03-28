import React from 'react';

const SectionTile = props => {
  return(
    <td>
      <p className={props.className} onClick={props.handleClick} id={props.id}>{props.name}</p>
    </td>
  )
}

export default SectionTile;
