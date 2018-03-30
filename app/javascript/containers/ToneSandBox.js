import React, { Component } from 'react'
import Tone from 'tone';

class ToneSandBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tempo: this.props.tempo,
      app: this.props.app,
      currentSection: this.props.app.sections[0]
    }
    this.loopToggle = this.loopToggle.bind(this);
    this.onTempoChange = this.onTempoChange.bind(this);
    this.setupRhythm = this.setupRhythm.bind(this);
    this.setupRhythms = this.setupRhythms.bind(this);
  }

  setupRhythm() {
    let chordsInRhythm = this.state.currentSection.rhythms[0].chords;
    let chord = chordsInRhythm[0];

    let synths = [];
    for (let i=0; i<chordsInRhythm.length; i++) {

      chordsInRhythm[i].synth.set({
        "oscillator" : {
          "type" : 'sine',
          "partials": chordsInRhythm[i].partials
        },
        "filter" : {
          "Q" : 0
        }
      });
      synths.push(chordsInRhythm[i].synth)
    }

    let subdiv = chordsInRhythm.length;
    let length = subdiv;
    // this formatting only works with even divisions presently
    let subdivFormatted = `${subdiv}n`;
    let lengthFormatted = `${length}n`;

    // transpose one note of first beat to check sequencing
    chordsInRhythm[0].notes2[0].transpose(1);

    chordsInRhythm = chordsInRhythm.map(chord => {
      return(
        new Tone.Event(function(time, chord){
        }, [chord.notes2])
      )
    })

    let iterator = 0;
    let seq = new Tone.Sequence(function(time,note) {
      if (iterator == chordsInRhythm.length) {
        iterator = 0;
      }
      for (let i=0; i<note.length; i++) {
        synths[iterator].triggerAttackRelease(note[i],lengthFormatted);
      }
      iterator += 1;
    }, chordsInRhythm, subdivFormatted);

    this.setState({
      seq: seq,
      synths: synths
    });
  }

  setupRhythms() {
    for (let i=0; i<this.state.currentSection.rhythms.length; i++) {
      this.setupRhythm(i);
    }
  }

  componentDidMount() {
    Tone.Transport.bpm.value = this.state.tempo;
    this.setupRhythm();
  }

  loopToggle(e) {
    if (e.target.checked) {
      this.state.seq.start(0);
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

  render() {
    return (
      <div>
        <input type="checkbox" onChange={this.loopToggle} />
        <input type="range" onChange={this.onTempoChange} min="40" max="240"/>
      </div>
    )
  }
}

export default ToneSandBox;