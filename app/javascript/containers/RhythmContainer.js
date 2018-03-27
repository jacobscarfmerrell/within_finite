import React, { Component } from 'react';
import RhythmTile from '../components/RhythmTile';

class RhythmContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    let rhythms;
    if (this.props.rhythms) {
      rhythms = this.props.rhythms;
    }
    else {
      rhythms = [this.props.rhythm];
    }
    let rhythmTiles = rhythms.map((rhythm, index) => {
      return(
        <RhythmTile
          key={index+1}
          id={index+1}
          name={String.fromCharCode(index+65)}
          divisor={rhythm.rhythm.divisor}
          handleClick={this.props.handleClick}
        />
      )
    })
    return (
      <div className='rhythm-table'>
        {rhythmTiles}
      </div>
    )
  }
}

export default RhythmContainer;
