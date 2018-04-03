import React, { Component } from 'react';
import RhythmContainer from './RhythmContainer';
import SectionContainer from './SectionContainer';
import ChordContainer from './ChordContainer';
import NoteContainer from './NoteContainer';
import { Link } from 'react-router';
import { INIT_STATE } from '../constants/Constants';
import { seedApp, buildSection, buildRhythm } from '../helpers/Helpers';
import AscendButton from '../components/AscendButton';
import ToneSandBox from './ToneSandBox';
import Tone from 'tone';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'unmounted',
      selectedSection: {},
      selectedRhythm: {},
      selectedChord: {},
      selectedNotes: [],
      tempo: 60,
      app: seedApp(),
      sequences: []
    };
    this.handleAscend = this.handleAscend.bind(this);
    this.handleDescend = this.handleDescend.bind(this);
    this.createSection = this.createSection.bind(this);
    this.deleteSection = this.deleteSection.bind(this);
    this.createRhythm = this.createRhythm.bind(this);
    this.deleteRhythm = this.deleteRhythm.bind(this);
    this.changeTimbreHandler = this.changeTimbreHandler.bind(this);
    this.onTempoChange = this.onTempoChange.bind(this);
    this.loopToggle = this.loopToggle.bind(this);
    this.setupRhythms = this.setupRhythms.bind(this);
    this.setupRhythm = this.setupRhythm.bind(this);
  }

  loopToggle(e) {
    if (e.target.checked) {
      debugger;
      let sectionId = Number(this.state.selectedSection.id)-1;
      let rhythms = this.state.app.sections[sectionId].rhythms;
      for (let i=0; i<rhythms.length; i++) {
        rhythms[i].sequence.start(0);
      }
      Tone.Transport.start();
    }
    else {
      Tone.Transport.pause();
    }
  }

  onTempoChange(e) {
    Tone.Transport.bpm.value = Number(e.target.value);
    this.setState({ tempo: Number(e.target.value) })
  }

  setupRhythms() {
    // I still need to double check that two rhythms play simultaneously when the rhythms are different
    let sectionId = Number(this.state.selectedSection.id)-1
    for (let i=0; i<this.state.app.sections[sectionId].rhythms.length; i++) {
      this.setupRhythm(i);
    }
  }

  setupRhythm(index) {
    let rhythm = this.state.app.sections[this.state.selectedSection.id-1].rhythms[index];
    let chords = rhythm.chords;
    let synths = [];
    for (let i=0; i<chords.length; i++) {
      chords[i].synth.set({
        "oscillator" : {
          "type" : 'sine',
          "partials": chords[i].partials
        },
        "filter" : {
          "Q" : 0
        }
      });
      synths.push(chords[i].synth)
    }

    let subdiv = chords.length;
    let length = subdiv;
    // this formatting only works with even divisions presently?
    let subdivFormatted = `${subdiv}n`;
    let lengthFormatted = `${length}n`;

    let chordEvents = chords.map(chord => {
      return(
        new Tone.Event(function(time, chord){
        }, chord.root.harmonize(chord.intervals))
        // harmonize() needed npm install tone@next to work
        // https://groups.google.com/forum/#!topic/tonejs/cfOamTAfwd8
      )
    })

    if (Object.getOwnPropertyNames(rhythm.sequence).length != 0) {
      rhythm.sequence.removeAll( )
    }
    let iterator = 0;
    let seq = new Tone.Sequence(function(time,note) {
      if (iterator == chordEvents.length) {
        iterator = 0;
      }
      for (let i=0; i<note.length; i++) {
        synths[iterator].triggerAttackRelease(note[i],lengthFormatted);
      }
      iterator += 1;
    }, chordEvents, subdivFormatted);


    // let sequences = Object.assign([],this.state.sequences)
    // sequences.push(seq);
    let app = Object.assign(this.state.app);
    app.sections[this.state.selectedSection.id-1].rhythms[index].sequence = seq
    // try storing these sequences in the rhythms
    this.setState({ app });
  }

  createSection() {
    let app = Object.assign({},this.state.app);
    let oldSections = this.state.app.sections;
    let newSection = buildSection(oldSections[oldSections.length-1].id);
    app.sections.push(newSection);
    this.setState({ app });
  }

  deleteSection(e) {
    let index = 0
    let newSections = Object.assign([],this.state.app.sections);
    for (let i = 0; i < newSections.length; i++) {
        if (newSections[i].id === Number(e.target.id)) {
          index = i;
        } else if (index != 0) {
          newSections[i].id -= 1;
        }
    }
    newSections.splice(index,1);
    let app = Object.assign({},this.state.app);
    app.sections = newSections;
    this.setState({ app });
  }

  createRhythm(e) {
    e.preventDefault();
    let currentSectionId = this.state.selectedSection.id;
    let rhythms = this.state.selectedSection.rhythms;
    let newRhythm = buildRhythm(rhythms[rhythms.length-1].id,Number(e.target[0].value));

    let app = Object.assign({},this.state.app);
    for (let i = 0; i < app.sections.length; i++) {
        if (app.sections[i].id === currentSectionId) {
          app.sections[i].rhythms.push(newRhythm);
        }
    }
    this.setState({ app });
  }

  deleteRhythm(e) {
    let currentSectionId = this.state.selectedSection.id;
    let rhythms = Object.assign({},this.state.selectedSection.rhythms);

    let index = 0;
    let app = Object.assign({},this.state.app);
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
    this.setState({ app });
  }

  changeTimbreHandler(e) {
    let app = Object.assign({},this.state.app);
    let currentSectionId = this.state.selectedSection.id;
    let currentRhythmId = this.state.selectedRhythm.id;
    let currentChordId = this.state.selectedChord.id;
    app.sections[currentSectionId-1].rhythms[currentRhythmId-1].chords[currentChordId-1].partials[e.target.id] = Number(e.target.value);
    this.setState({ app });
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
    else if (this.state.view == 'chordNote') {
      this.setState({
        view: 'rhythmChord'
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
      this.setupRhythms();
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
      e.preventDefault();
      let intervals = [];
      for (let i=0; i<e.target.length; i++) {
        if (e.target[i].checked) {
          intervals.push(Number(e.target[i].id));
        }
      }
      let app = Object.assign({},this.state.app);
      let sectionId = this.state.selectedSection.id;
      let rhythmId = this.state.selectedRhythm.id;
      let chordId = this.state.selectedChord.id;
      app.sections[sectionId-1].rhythms[rhythmId-1].chords[chordId-1].intervals = intervals;
      this.setState({
        app: app,
        selectedNotes: intervals,
        view: 'chordNote'
      });
    }
    else if (this.state.view == 'chordNote' && Object.getOwnPropertyNames(this.state.selectedNote).length === 0) {
      let splitId = e.target.id.split('-');
      this.setState({
        selectedChord: this.state.selectedRhythm.chords[Number(splitId[0])-1]
      });
    }
  }

  componentDidMount() {
    this.setState(INIT_STATE);
  }

  render() {
    let display;
    let {view, selectedSection, selectedRhythm, selectedChord, selectedNotes, app} = this.state;
    Tone.Transport.bpm.value = this.state.tempo;

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
        <h3>Select Step</h3>
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
          handleDescend={this.handleDescend}
        />
      </div>;
    }
    else if (view == 'chordNote') {
      display = <div>
        <AscendButton handleClick={this.handleAscend} />
        <h3>Chord</h3>
        <ChordContainer
          chords={selectedRhythm.chords}
          selectedChord={selectedChord}
          handleClick={this.handleDescend}
          intervals={selectedNotes}
        />
        <hr/>
        <h3>Note</h3>
        <NoteContainer
          selectedChord={selectedChord}
          handleChange={this.changeTimbreHandler}
        />
      </div>;
    }
    else if (view == 'sandbox') {
      display = <ToneSandBox app={this.state.app} tempo={this.state.tempo}/>
    }
    return (
      <div>
        <div>
          <input type="checkbox" onChange={this.loopToggle} />
          <input type="range" onChange={this.onTempoChange} min="40" max="240"/>
        </div>
        {display}
      </div>
    )
  }
}

export default App;
