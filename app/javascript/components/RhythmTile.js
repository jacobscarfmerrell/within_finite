import React from 'react';

const RhythmTile = props => {
  let antecedent_row = [];
  for (let i=0; i < props.antecedent; i++) {
    antecedent_row.push(<th>{i+1}</th>);
  }
  let consequent_row = [];
  for (let i=0; i < props.consequent; i++) {
    consequent_row.push(<th>{i+1}</th>);
  }
  return(
    <div>
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
    </div>
  )
}

export default RhythmTile;
