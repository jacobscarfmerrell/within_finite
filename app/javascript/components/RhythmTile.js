import React from 'react';

const RhythmTile = props => {
  let antecedent_row = [];
  for (let i=1; i <= props.antecedent; i++) {
    antecedent_row.push(<th id={'a.'+i} key={i}>{i}</th>);
  }
  let consequent_row = [];
  for (let i=1; i <= props.consequent; i++) {
    consequent_row.push(<th id={'c.'+i} key={i}>{i}</th>);
  }
  return(
    <div onClick={props.handleClick} id={`${props.id}`}>
      <hr className="divider divider-short"/>

      <table className={'rhythm rhythm-'+props.antecedent}>
        <thead>
          <tr>
              {antecedent_row}
          </tr>
        </thead>
      </table>
      <table className={'rhythm rhythm-'+props.consequent}>
        <thead>
          <tr>
              {consequent_row}
          </tr>
        </thead>
      </table>

      <hr className="divider divider-short"/>
    </div>
  )
}

export default RhythmTile;
