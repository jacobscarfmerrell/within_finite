import React from 'react';

const SectionTile = props => {
  return(
    <div>
      <p onClick={props.handleClick} id={props.id} className="button">{props.name}</p>
    </div>
  )
}

export default SectionTile;
