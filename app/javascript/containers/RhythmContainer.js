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
      let className = 'rhythm-tile '
      if (Object.getOwnPropertyNames(this.props.selectedRhythm).length != 0) {
        if (this.props.selectedRhythm.id == rhythm.id) {
          className += 'rhythm-selected '
        }
      }
      return(
        <RhythmTile
          key={rhythm.id}
          id={rhythm.id}
          handleClick={this.props.handleClick}
          className={className}
          divisor={rhythm.chords.length}
          selectedChordId={this.props.selectedChordId}
        />
      )
    })
    return (
      <ul className='rhythm-table'>
        {rhythms}
      </ul>
    )
  }
}

export default RhythmContainer;
