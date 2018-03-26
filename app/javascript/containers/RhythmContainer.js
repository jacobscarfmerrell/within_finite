import React, { Component } from 'react';
import RhythmTile from '../components/RhythmTile';

class RhythmContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    let rhythmTiles = this.props.rhythms.map(rhythm => {
      return(
        <RhythmTile
          key={rhythm.id}
          antecedent={rhythm.antecedent}
          consequent={rhythm.consequent}
        />
      )
    })
    return (
      <div>{rhythmTiles}</div>
    )
  }
}

export default RhythmContainer;
