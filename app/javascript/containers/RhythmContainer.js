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
          id={rhythm.id}
          antecedent={rhythm.antecedent}
          consequent={rhythm.consequent}
          handleClick={this.props.handleClick}
        />
      )
    })
    return (
      <div>{rhythmTiles}</div>
    )
  }
}

export default RhythmContainer;
