import React, { Component } from 'react'
import ChordTile from '../components/ChordTile'

class ChordContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    let chords = this.props.chords;
    if (Object.getOwnPropertyNames(this.props.selectedChord).length != 0) {
      chords = [this.props.selectedChord];
    }
    let chordList = chords.map(chord => {
      let className = 'chord-tile '
      if (Object.getOwnPropertyNames(this.props.selectedChord).length != 0) {
        if (this.props.selectedChord.id == chord.id) {
          className = 'chord-selected ' + className
        }
      }
      return(
        <ChordTile
          key={chord.id}
          id={chord.id}
          className={className}
          handleClick={this.props.handleClick}
          notes={chord.notes}
          selectedNoteId={this.props.selectedNoteId}
        />
      )
    })
    return (
      <div className='chord-table'>
        {chordList}
      </div>
    )
  }
}

export default ChordContainer;
