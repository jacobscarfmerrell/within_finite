import React, { Component } from 'react';
import RhythmContainer from './RhythmContainer';
import SectionContainer from './SectionContainer';
import ChordContainer from './ChordContainer';
import NoteContainer from './NoteContainer';
import { Link } from 'react-router';
import { INIT_STATE } from '../constants/Constants'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      view: 'unmounted',
      currentSection: {},
      currentRhythm: {},
      currentChord: {},
      currentNote: {},
      app: {}
    }
  }

  addRhythm() {
    let currentRhythms = this.state.currentSection.rhythms
    this.setState({

    });
  }


  componentDidMount() {
    this.setState(INIT_STATE);
  }

  render() {
    let display;
    let view = this.state.view;
    console.log(this.state.app)

    if (view == 'unmounted') {}
    else if (view == 'sectionRhythm') {
      display = <div>
        <SectionContainer sections={this.state.app.sections}/><hr/>
        <RhythmContainer rhythms={this.state.app.sections[0].rhythms}/>
      </div>;
    }
    else if (view == 'rhythmChord') {
      display = <div>
        <RhythmContainer /><hr/>
        <ChordContainer />
      </div>;
    }
    else if (view == 'chordNote') {
      display = <div>
        <ChordContainer /><hr/>
        <NoteContainer />
      </div>;
    }

    return (
      <div>
        {display}
      </div>
    )
  }
}

export default App;
