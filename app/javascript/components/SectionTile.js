import React from 'react';

const SectionTile = props => {
  return(
    <div className="section-row">
      <ul>
        <li className={props.className} onClick={props.handleClick} id={props.id}>{props.name}
        </li>
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

export default SectionTile;
