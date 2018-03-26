import React from 'react';

const SectionTile = props => {
  return(
    <th onClick={props.handleClick} id={props.id}>
      {props.name}
    </th>
  )
}

export default SectionTile;
