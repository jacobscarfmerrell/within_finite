import React, { Component } from 'react'
import ChordForm from '../components/ChordForm'
import ChordTile from '../components/ChordTile'

class ChordContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    let chord = this.props.selectedChord;
    let chordList =
        <ChordTile
          key={chord.id}
          id={chord.id}
          intervals={this.props.intervals}
        />

    if (this.props.intervals == undefined) {
      chordList = <ChordForm handleDescend={this.props.handleDescend} selectedChord={this.props.selectedChord}/>
    }
    return (
      <div className='chord-table'>
        {chordList}
      </div>
    )
  }
}

export default ChordContainer;
