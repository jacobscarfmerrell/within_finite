import React from 'react';

const SectionTile = props => {
  return(
    <td>
      <p className={props.className} onClick={props.handleClick} id={props.id}>{props.name}</p>
      {
        (props.id > 1 && props.deleteHandler) &&
        <p id={props.id} onClick={props.deleteHandler}>x</p>
      }
    </td>
  )
}

export default SectionTile;
