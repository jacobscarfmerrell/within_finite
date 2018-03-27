import React, { Component } from 'react';
import RhythmTile from '../components/RhythmTile';

class RhythmContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    return (
      <div className='rhythm-table'>
        <p>rhythm tiles go here</p>
      </div>
    )
  }
}

export default RhythmContainer;
