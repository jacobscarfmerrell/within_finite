import React, { Component } from 'react'
import ChordTile from '../components/ChordTile'

class ChordContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    let chords;
    if (this.props.chords) {
      chords = this.props.chords;
    }
    else {
      chords = [this.props.chord];
    }
    let chordTiles = chords.map((chord, index) => {
      return(
        <ChordTile
          key={index+1}
          id={index+1}
          location={chord.chord.location}
          handleClick={this.props.handleClick}
        />
      )
    })
    return (
      <div>
        {chordTiles}
      </div>
    )
  }
}

export default ChordContainer;
