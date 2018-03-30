import React, { Component } from 'react'
import Tone from 'tone';

class ToneSandBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tempo: this.props.tempo,
      app: this.props.app
    }
    this.loopToggle = this.loopToggle.bind(this);
    this.onTempoChange = this.onTempoChange.bind(this);

  }

  playNote() {
    let synth = new Tone.PolySynth(16,Tone.Synth).toMaster()
    synth.set({
      "oscillator" : {
        "type" : 'sine'
      },
      "filter" : {
        "Q" : 0
      }
    });
    this.setState({
      synth: synth
    });
  }

  componentDidMount() {
    Tone.Transport.bpm.value = this.state.tempo;

    let rootNote = Tone.Frequency('C3')
    let intervals = [0,4,7];
    let chordFreqs = rootNote.harmonize(intervals);
    console.log(chordFreqs[0]);
    let seq = new Tone.Sequence(this.playNote,chordFreqs)

    this.setState({
      seq: seq
    });
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
    console.log(e.target.value)
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
