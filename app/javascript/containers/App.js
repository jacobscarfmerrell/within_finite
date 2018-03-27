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
      view: 'sectionRhythm',
      currentSection: {},
      currentRhythm: {},
      currentChord: {},
      currentNote: {}
    }
    this.handleSectionClick = this.handleSectionClick.bind(this);
    this.handleRhythmClick = this.handleRhythmClick.bind(this);
    this.handleChordClick = this.handleChordClick.bind(this);
  }

  addRhythm() {
    let currentRhythms = this.state.currentSection.rhythms
    this.setState({

    });
  }





  handleSectionClick(e) {
    this.setState({
      currentSection: Number(e.target.id)
    });
  }

  handleRhythmClick(e) {
    if (this.state.view == 'sectionRhythm') {
      this.setState({
        currentRhythm: Number(e.currentTarget.id),
        view: 'rhythmChord'
      });
    } else if (this.state.view == 'rhythmChord') {
      this.setState({
        currentChordLocation: Number(e.target.innerText)
      });
    }
  }

  handleChordClick(e) {
    if (this.state.view == 'rhythmChord') {
      this.setState({
        currentChordLocation: Number(e.target.innerText),
        currentChord: Number(e.currentTarget.id),
        view: 'chordNote'
      });
    } else if (this.state.view == 'chordNote') {
      let id = e.target.id.split('.')
      this.setState({
        currentNoteColor: id[0],
        currentNoteId: Number(id[1])
      })
    }
  }

  componentDidMount() {
    this.setState(INIT_STATE);
  }

  render() {
    console.log(this.state.app)
    let display;
    // let view = this.state.view;
    // let sections = this.state.app.sections;
    // let sectionIndex = this.state.currentSection-1;
    //
    // let rhythmIndex = this.state.currentRhythm-1;
    // let selectedRhythm = sections[sectionIndex].section.rhythms[rhythmIndex];
    //
    // let chordLocation = this.state.currentChordLocation;
    // let chordIndex = this.state.currentChord-1;
    // let selectedChord = selectedRhythm.rhythm.chords[chordIndex];
    //
    // let noteId = this.state.currentNoteColor+'.'+this.state.currentNoteId;
    // let noteIndex = this.state.currentNote-1;
    //
    // if (view == 'sectionRhythm') {
    //   let selectedSectionRhythms = sections[sectionIndex].section.rhythms;
    //   display = <div>
    //     <SectionContainer sections={sections} handleClick={this.handleSectionClick}/><hr/>
    //     <RhythmContainer rhythms={selectedSectionRhythms} handleClick={this.handleRhythmClick}/>
    //   </div>;
    // }
    // else if (view == 'rhythmChord') {
    //   let selectedRhythmChords = selectedRhythm.rhythm.chords.filter(chord => chord.chord.location == chordLocation);
    //   display = <div>
    //     <RhythmContainer rhythm={selectedRhythm} handleClick={this.handleRhythmClick}/><hr/>
    //     <ChordContainer chords={selectedRhythmChords} handleClick={this.handleChordClick}/>
    //   </div>;
    // }
    // else if (view == 'chordNote') {
    //   let selectedNote = selectedChord.chord.notes[noteIndex];
    //   display = <div>
    //     <ChordContainer chord={selectedChord} handleClick={this.handleChordClick}/><hr/>
    //     <NoteContainer note={selectedNote} />
    //   </div>;
    // }

    return (
      <div>
        {display}
      </div>
    )
  }
}

export default App;
