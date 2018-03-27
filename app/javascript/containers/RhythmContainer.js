import React, { Component } from 'react';
import RhythmTile from '../components/RhythmTile';

class RhythmContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    let rhythms = this.props.rhythms.map(rhythm => {
      return(
        <RhythmTile key={rhythm.id}/>
      )
    })
    return (
      <div className='rhythm-table'>
        {rhythms}
      </div>
    )
  }
}

export default RhythmContainer;
