import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import RhythmContainer from './RhythmContainer';
import SectionContainer from './SectionContainer';
import ChordContainer from './ChordContainer';
import NoteContainer from './NoteContainer';
import { Link } from 'react-router';
import { seedApp, buildSection, buildRhythm, seedSection } from '../helpers/Helpers';
import AscendButton from '../components/AscendButton';
import ToneSandBox from './ToneSandBox';
import Tone from 'tone';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'unmounted',
      selectedSectionId: 1,
      lastSelectedSectionId: null,
      selectedRhythmId: 1,
      selectedChordId: null,
      selectedNotes: [],
      tempo: 60,
      app: seedApp(),
      playing: false
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
      Tone.Transport.start();
      this.setState({playing: true})
      document.getElementById("switch-1-icon").style.color = "#ecfbfe";
    }
    else {
      Tone.Transport.pause();
      this.setState({playing: false})
      document.getElementById("switch-1-icon").style.color = '#fdb4cd';
    }
  }

  onTempoChange(e) {
    Tone.Transport.bpm.value = Number(e.target.value);
    this.setState({ tempo: Number(e.target.value) })
  }

  setupRhythms(sectionIdClicked) {
    let sectionId;
    if (sectionIdClicked == null) {
      if (this.state.selectedSectionId != null) {
        sectionId = this.state.selectedSectionId;
      }
      else if (this.state.lastSelectedSectionId != null) {
        sectionId = this.state.lastSelectedSectionId;
      }
    }
    else {
      sectionId = sectionIdClicked;
    }

    let sections = this.state.app.sections
    for (let i=0; i<sections.length; i++) {
      if (sections[i].id != sectionId) {
        for (let j=0; j<sections[i].rhythms.length; j++) {
          if (Object.getOwnPropertyNames(sections[i].rhythms[j].sequence) != 0) {
            sections[i].rhythms[j].sequence.stop();
          }
        }
      }
    }
    let rhythms = this.state.app.sections[sectionId-1].rhythms;
    for (let i=0; i<rhythms.length; i++) {
      this.setupRhythm(i,sectionId-1);
      rhythms[i].sequence.start(0);
    }
  }

  setupRhythm(index,sectionIndex) {
    let rhythm = this.state.app.sections[sectionIndex].rhythms[index];
    let chords = rhythm.chords;
    let synths = [];
    for (let i=0; i<chords.length; i++) {
      chords[i].synth.set({
        "oscillator" : {
          "type" : 'sine',
          "partials": chords[i].partials
        }
      });
      synths.push(chords[i].synth);
    }

    let subdiv = chords.length;
    let length = subdiv;
    let subdivFormatted = `${subdiv}n`;
    let lengthFormatted = `${length}n`;

    let chordEvents = chords.map(chord => {
      return(
        new Tone.Event(function(time, chord){
        }, chord.root.harmonize(chord.intervals))
        // harmonize() needed npm install tone@next to work
        // https://groups.google.com/forum/#!topic/tonejs/cfOamTAfwd8
      );
    });

    if (Object.getOwnPropertyNames(rhythm.sequence).length != 0) {
      rhythm.sequence.removeAll();
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

    let app = Object.assign(this.state.app);
    app.sections[sectionIndex].rhythms[index].sequence = seq
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
    let index = 0;
    let app = Object.assign({},this.state.app);
    let newSections = app.sections;
    for (let i = 0; i<newSections.length; i++) {
      if (newSections[i].id === Number(e.currentTarget.id)) {
        index = i;
      } else if (index != 0) {
        newSections[i].id -= 1;
      }
    }
    newSections.splice(index,1);
    app.sections = newSections;
    this.setState({ app });
  }

  createRhythm(e) {
    e.preventDefault();
    let currentSectionId = this.state.selectedSectionId;
    let rhythms = this.state.app.sections[this.state.selectedSectionId-1].rhythms;
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
    let currentSectionIndex = this.state.selectedSectionId-1;
    let app = Object.assign({},this.state.app);
    let rhythms = Object.assign([],app.sections[currentSectionIndex].rhythms);
    let index = 0;
    for (let i=0; i<rhythms.length; i++) {
      if (rhythms[i].id === Number(e.target.id)) {
        index = i;
      } else if (index != 0) {
        rhythms[i].id -= 1;
      }
    }
    if (Object.getOwnPropertyNames(rhythms[index].sequence).length == 0) {
      this.setupRhythms(null);
    }
    rhythms[index].sequence.removeAll();
    rhythms.splice(index,1);
    app.sections[currentSectionIndex].rhythms = rhythms;
    this.setState({ app });
  }

  changeTimbreHandler(e) {
    let app = Object.assign({},this.state.app);
    let currentSectionIndex = this.state.selectedSectionId-1;
    let currentRhythmIndex = this.state.selectedRhythmId-1;
    let currentChordIndex = this.state.selectedChordId-1;
    app.sections[currentSectionIndex].rhythms[currentRhythmIndex].chords[currentChordIndex].partials[e.target.id] = Number(e.target.value);
    this.setState({ app });
  }

  handleAscend(e) {
    this.setupRhythms(null);
    if (this.state.view == 'sectionRhythm') {
      document.getElementById("ascend").disabled = true;
      // if (this.state.playing == true) { this.loopToggle() }
      this.setState({
        lastSelectedSectionId: this.state.selectedSectionId,
        selectedSectionId: null
      });
    }
    else if (this.state.view == 'rhythmChord') {
      this.setState({
        view: 'sectionRhythm',
        selectedRhythmId: null
      });
    }
    else if (this.state.view == 'chordNote') {
      this.setState({
        view: 'rhythmChord'
      });
    }
  }

  handleDescend(e) {
    if (this.state.selectedSectionId == null) {
      if (this.state.app.sections[Number(e.target.id)-1].id != null) {
        this.setupRhythms(this.state.app.sections[Number(e.target.id)-1].id)
      }
    }
    else { this.setupRhythms(null) }
    if (this.state.view=='sectionRhythm' &&
    this.state.selectedSectionId == null) {
      document.getElementById("ascend").disabled = false;
      this.setState({
        selectedSectionId: this.state.app.sections[Number(e.target.id)-1].id
      });
    }
    else if (this.state.view=='sectionRhythm') {
      let splitId = e.target.id.split('-');
      this.setState({
        view: 'rhythmChord',
        selectedRhythmId: this.state.app.sections[this.state.selectedSectionId-1].rhythms[Number(splitId[0])-1].id,
        selectedChordId: this.state.app.sections[this.state.selectedSectionId-1].rhythms[Number(splitId[0])-1].chords[Number(splitId[1])-1].id
      });
    }
    else if (this.state.view == 'rhythmChord' &&
    this.state.selectedRhythmId == null) {
      let splitId = e.target.id.split('-');
      this.setState({
        selectedRhythmId: this.state.app.sections[this.state.selectedSectionId-1].rhythms[Number(splitId[0])-1].id,
        selectedChordId: this.state.app.sections[this.state.selectedSectionId-1].rhythms[Number(splitId[0])-1].chords[Number(splitId[1])-1].id
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
      let sectionIndex = this.state.selectedSectionId-1;
      let rhythmIndex = this.state.selectedRhythmId-1;
      let chordIndex = this.state.selectedChordId-1;
      app.sections[sectionIndex].rhythms[rhythmIndex].chords[chordIndex].intervals = intervals;
      this.setState({
        app: app,
        selectedNotes: intervals,
        view: 'chordNote'
      });
    }
    else if (this.state.view == 'chordNote' && this.state.selectedNotes.length == 0) {
      let splitId = e.target.id.split('-');
      this.setState({
        selectedChordId: this.state.app.sections[this.state.selectedSectionId-1].rhythms[this.state.selectedRhythmId-1].chords[Number(splitId[0])-1].id
      });
    }
  }

  componentDidMount() {
    this.setupRhythms();
    this.setState({ view: 'sectionRhythm' });
  }

  render() {
    let display;
    let {view, selectedSectionId, selectedRhythmId, selectedChordId, selectedNotes, app} = this.state;
    Tone.Transport.bpm.value = this.state.tempo;
    // console.log('app',app);

    if (view == 'unmounted') {}
    else if (view == 'sectionRhythm' && selectedSectionId == null) {
      display = <div>
        <h3>Sections</h3>
          <SectionContainer
            createHandler={this.createSection}
            deleteHandler={this.deleteSection}
            sections={app.sections}
            selectedSection={app.sections[selectedSectionId-1]}
            handleClick={this.handleDescend}
          />
        <hr/>
      </div>;
    }
    else if (view == 'sectionRhythm') {
      display = <div>
        <h3>Section</h3>
        <SectionContainer
          sections={app.sections}
          selectedSection={app.sections[selectedSectionId-1]}
        />
        <hr/>
        <h3>Steps</h3>
        <RhythmContainer
          createHandler={this.createRhythm}
          deleteHandler={this.deleteRhythm}
          rhythms={app.sections[selectedSectionId-1].rhythms}
          selectedChordId={selectedChordId}
          selectedRhythm={app.sections[selectedSectionId-1].rhythms[selectedRhythmId-1]}
          handleClick={this.handleDescend}
        />
      </div>;
    }
    else if (view == 'rhythmChord' && selectedRhythmId == null) {
      display = <div>
        <h3>Steps</h3>
        <RhythmContainer
          rhythms={app.sections[selectedSectionId-1].rhythms}
          selectedRhythm={app.sections[selectedSectionId-1].rhythms[selectedRhythmId-1]}
          selectedChordId={selectedChordId}
          handleClick={this.handleDescend}
        />
        <hr/>
      </div>;
    }
    else if (view == 'rhythmChord') {
      display = <div>
        <h3>Step</h3>
        <RhythmContainer
          rhythms={app.sections[selectedSectionId-1].rhythms}
          selectedRhythm={app.sections[selectedSectionId-1].rhythms[selectedRhythmId-1]}
          selectedChordId={selectedChordId}
        />
        <hr/>
        <h3>Chord-Tones</h3>
        <ChordContainer
          chords={app.sections[selectedSectionId-1].rhythms[selectedRhythmId-1].chords}
          selectedChord={app.sections[selectedSectionId-1].rhythms[selectedRhythmId-1].chords[selectedChordId-1]}
          handleDescend={this.handleDescend}
        />
      </div>;
    }
    else if (view == 'chordNote') {
      display = <div>
        <h3>Chord</h3>
        <ChordContainer
          chords={app.sections[selectedSectionId-1].rhythms[selectedRhythmId-1].chords}
          selectedChord={app.sections[selectedSectionId-1].rhythms[selectedRhythmId-1].chords[selectedChordId-1]}
          handleClick={this.handleDescend}
          intervals={selectedNotes}
        />
        <hr/>
        <h3>Partials</h3>
        <NoteContainer
          selectedChord={app.sections[selectedSectionId-1].rhythms[selectedRhythmId-1].chords[selectedChordId-1]}
          handleChange={this.changeTimbreHandler}
        />
      </div>;
    }
    let ascend_disabled = false;
    if (view == 'sectionRhythm' && selectedSectionId == null) {
      ascend_disabled = true
    }
    let play_pause;
    if (this.state.playing) {
      play_pause = 'pause_circle_outline';
    } else {
      play_pause = 'play_circle_outline'
    }
    return (
      <div>
        <div id="app-toolbar">
          <AscendButton handleClick={this.handleAscend} disable={ascend_disabled} />
          <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent ">
            <label className="mdl-icon-toggle mdl-js-icon-toggle" htmlFor="switch-1">
              <i className="mdl-icon-toggle__label material-icons md-light" id="switch-1-icon">{play_pause}</i>
              <input type="checkbox" id="switch-1" className="mdl-icon-toggle__input" onClick={this.loopToggle} />
            </label>
          </button>
          <label htmlFor="tempo-slider" id="tempo-slider">
            <span id="tempo-slider-label">Tempo</span>
            <input className="mdl-slider mdl-js-slider" onChange={this.onTempoChange} type="range" id="tempo-slider-input"
              min="40" max="240" defaultValue="60" tabIndex="0" />
          </label>
        </div>

        <div id="app-views">
          {display}
        </div>
      </div>
    )
  }
}

export default App;
