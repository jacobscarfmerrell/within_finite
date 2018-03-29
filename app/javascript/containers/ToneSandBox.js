import React, { Component } from 'react'
import Tone from 'tone';

class ToneSandBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tempo: this.props.tempo
    }
    this.loopToggle = this.loopToggle.bind(this);
    this.onTempoChange = this.onTempoChange.bind(this);

  }

  componentDidMount() {
    Tone.Transport.bpm.value = this.state.tempo;
    let synth = new Tone.PolySynth(2,Tone.MonoSynth).toMaster()
    for (let i=0; i < synth.voices.length; i++) {
      synth.voices[i].oscillator.type = 'sine'
      // the below Q will not go away, just awful
      synth.voices[i].filter.Q.value = 0
    };
    let seq = new Tone.Sequence(function(time, note) {
      synth.triggerAttackRelease(note,'16n',time)
    }, ["C3","E3","G3","B3"], "16n");
    this.setState({
      synth: synth,
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
