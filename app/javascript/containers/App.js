import React, { Component } from 'react';
import RhythmContainer from './RhythmContainer';
import SectionContainer from './SectionContainer';
import ChordContainer from './ChordContainer';
import NoteContainer from './NoteContainer';
import { Link } from 'react-router';
import { INIT_STATE } from '../constants/Constants';
import { buildSection, buildRhythm } from '../helpers/Helpers';
import AscendButton from '../components/AscendButton';
import ToneSandBox from './ToneSandBox';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'unmounted',
      selectedSection: {},
      selectedRhythm: {},
      selectedChord: {},
      selectedNote: {},
      tempo: 60,
      app: {}
    };
    this.handleAscend = this.handleAscend.bind(this);
    this.handleDescend = this.handleDescend.bind(this);
    this.createSection = this.createSection.bind(this);
    this.deleteSection = this.deleteSection.bind(this);
    this.createRhythm = this.createRhythm.bind(this);
    this.deleteRhythm = this.deleteRhythm.bind(this);
    this.chordSelect = this.chordSelect.bind(this);
  }

  createSection() {
    let app = this.state.app;
    let oldSections = this.state.app.sections;
    let newSection = buildSection(oldSections[oldSections.length-1].id);
    app.sections.push(newSection);
    this.setState({
      app: app
    });
  }

  deleteSection(e) {
    let index = 0
    let newSections = this.state.app.sections;
    for (let i = 0; i < newSections.length; i++) {
        if (newSections[i].id === Number(e.target.id)) {
          index = i;
        } else if (index != 0) {
          newSections[i].id -= 1;
        }
    }
    newSections.splice(index,1);
    let app = this.state.app;
    app.sections = newSections;
    this.setState({
      app: app
    });
  }

  createRhythm(e) {
    e.preventDefault();
    let currentSectionId = this.state.selectedSection.id;
    let rhythms = this.state.selectedSection.rhythms;
    let newRhythm = buildRhythm(rhythms[rhythms.length-1].id,Number(e.target[0].value));

    let app = this.state.app;
    for (let i = 0; i < app.sections.length; i++) {
        if (app.sections[i].id === currentSectionId) {
          app.sections[i].rhythms.push(newRhythm);
        }
    }
    this.setState({
      app: app
    });
  }

  deleteRhythm(e) {
    let currentSectionId = this.state.selectedSection.id;
    let rhythms = this.state.selectedSection.rhythms;

    let index = 0;
    let app = this.state.app;
    for (let i = 0; i < rhythms.length; i++) {
      if (rhythms[i].id === Number(e.target.id)) {
        index = i;
      } else if (index != 0) {
        rhythms[i].id -= 1;
      }
    }

    let sectionIndex = 0;
    let newSections = this.state.app.sections;
    for (let i = 0; i < newSections.length; i++) {
        if (newSections[i].id === Number(e.target.id)) {
          sectionIndex = i;
        }
    }
    app.sections[sectionIndex].rhythms.splice(index,1);
    this.setState({
      app: app
    });
  }

  chordSelect(e) {
    // FILL IN; MAY NEED HELPER
  }

  handleAscend(e) {
    if (this.state.view == 'sectionRhythm') {
      this.setState({
        selectedSection: {}
      });
    }
    else if (this.state.view == 'rhythmChord' &&
    Object.getOwnPropertyNames(this.state.selectedRhythm).length === 0) {
      this.setState({
        view: 'sectionRhythm',
        selectedRhythm: {}
      });
    }
    else if (this.state.view == 'rhythmChord') {
      this.setState({
        selectedRhythm: {}
      });
    }
    else if (this.state.view == 'chordNote' &&
    Object.getOwnPropertyNames(this.state.selectedNote).length === 0) {
      this.setState({
        view: 'rhythmChord'
      });
    }
    else if (this.state.view == 'chordNote') {
      this.setState({
        selectedNote: {}
      });
    }
  }

  handleDescend(e) {
    if (this.state.view=='sectionRhythm' &&
    Object.getOwnPropertyNames(this.state.selectedSection).length === 0) {
      this.setState({
        selectedSection: this.state.app.sections[Number(e.target.id)-1]
      });
    }
    else if (this.state.view=='sectionRhythm') {
      let splitId = e.target.id.split('-');
      this.setState({
        view: 'rhythmChord',
        selectedRhythm: this.state.selectedSection.rhythms[Number(splitId[0])-1],
        selectedChord: this.state.selectedSection.rhythms[Number(splitId[0])-1].chords[Number(splitId[1])-1]
      });
    }
    else if (this.state.view == 'rhythmChord' &&
    Object.getOwnPropertyNames(this.state.selectedRhythm).length === 0) {
      let splitId = e.target.id.split('-');
      this.setState({
        selectedRhythm: this.state.selectedSection.rhythms[Number(splitId[0])-1],
        selectedChord: this.state.selectedSection.rhythms[Number(splitId[0])-1].chords[Number(splitId[1])-1]
      });
    }
    else if (this.state.view == 'rhythmChord') {
      let splitId = e.target.id.split('-');
      this.setState({
        selectedChord: this.state.selectedRhythm.chords[Number(splitId[0])-1],
        selectedNote: this.state.selectedRhythm.chords[Number(splitId[0])-1].notes[Number(splitId[1])-1],
        view: 'chordNote'
      });
    }
    else if (this.state.view == 'chordNote' && Object.getOwnPropertyNames(this.state.selectedNote).length === 0) {
      let splitId = e.target.id.split('-');
      this.setState({
        selectedChord: this.state.selectedRhythm.chords[Number(splitId[0])-1],
        selectedNote: this.state.selectedRhythm.chords[Number(splitId[0])-1].notes[Number(splitId[1])-1]
      });
    }
  }

  componentDidMount() {
    this.setState(INIT_STATE);
  }

  // delete when ToneSandBox is removed
  componentWillMount() {
    this.setState(INIT_STATE);
  }

  render() {
    let display;
    let {view, selectedSection, selectedRhythm, selectedChord, selectedNote, app} = this.state;
    // console.log('app',app);

    if (view == 'unmounted') {}
    else if (view == 'sectionRhythm' && Object.getOwnPropertyNames(selectedSection).length === 0) {
      display = <div>
        <h3>Add/Delete/Select Sections</h3>
          <SectionContainer
            createHandler={this.createSection}
            deleteHandler={this.deleteSection}
            sections={app.sections}
            selectedSection={selectedSection}
            handleClick={this.handleDescend}
          />
        <hr/>
      </div>;
    }
    else if (view == 'sectionRhythm') {
      display = <div>
        <AscendButton handleClick={this.handleAscend} />
        <h3>Chosen Section</h3>
        <SectionContainer
          sections={app.sections}
          selectedSection={selectedSection}
        />
        <hr/>
        <h3>Add/Delete/Select Rhythms</h3>
        <RhythmContainer
          createHandler={this.createRhythm}
          deleteHandler={this.deleteRhythm}
          rhythms={selectedSection.rhythms}
          selectedChordId={selectedChord.id}
          selectedRhythm={selectedRhythm}
          handleClick={this.handleDescend}
        />
      </div>;
    }
    else if (view == 'rhythmChord' && Object.getOwnPropertyNames(selectedRhythm).length === 0) {
      display = <div>
        <AscendButton handleClick={this.handleAscend} />
        <h3>Select Rhythmic Step</h3>
        <RhythmContainer
          rhythms={selectedSection.rhythms}
          selectedRhythm={selectedRhythm}
          selectedChordId={selectedChord.id}
          handleClick={this.handleDescend}
        />
        <hr/>
      </div>;
    }
    else if (view == 'rhythmChord') {
      // console.log(selectedNote);
      display = <div>
        <AscendButton handleClick={this.handleAscend} />
        <h3>Selected Step</h3>
        <RhythmContainer
          rhythms={selectedSection.rhythms}
          selectedRhythm={selectedRhythm}
          selectedChordId={selectedChord.id}
        />
        <hr/>
        <h3>Select Chord-Tones</h3>
        <ChordContainer
          chords={selectedRhythm.chords}
          selectedChord={selectedChord}
          selectedNoteId={selectedNote.fundamental}
          handleClick={this.handleChordSelect}
        />
      </div>;
    }
    else if (view == 'chordNote' && Object.getOwnPropertyNames(selectedNote).length === 0) {
      display = <div>
        <AscendButton handleClick={this.handleAscend} />
        <h3>Chord</h3>
        <ChordContainer
          chords={selectedRhythm.chords}
          selectedChord={selectedChord}
          selectedNoteId={selectedNote.fundamental}
          handleClick={this.handleDescend}
        />
        <hr/>
      </div>;
    }
    else if (view == 'chordNote') {
      display = <div>
        <AscendButton handleClick={this.handleAscend} />
        <h3>Chord</h3>
        <ChordContainer
          chords={selectedRhythm.chords}
          selectedChord={selectedChord}
          selectedNoteId={selectedNote.fundamental}
          handleClick={this.handleDescend}
        />
        <hr/>
        <h3>Note</h3>
        <NoteContainer
          selectedNote={selectedNote}
        />
      </div>;
    }
    else if (view == 'sandbox') {
      display = <ToneSandBox app={this.state.app} tempo={this.state.tempo}/>
    }
    return (
      <div>
        {display}
      </div>
    )
  }
}

export default App;
