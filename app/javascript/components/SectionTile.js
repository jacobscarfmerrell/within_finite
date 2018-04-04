import React from 'react';

const SectionTile = props => {
  return(
    <td>
      <p className={props.className} onClick={props.handleClick} id={props.id}>{props.name}
      </p>
      {
        (props.id > 1 && props.deleteHandler) &&
        <i id={props.id} onClick={props.deleteHandler} className="material-icons delete-section-button">
          delete
        </i>
      }

    </td>
  )
}

export default SectionTile;
