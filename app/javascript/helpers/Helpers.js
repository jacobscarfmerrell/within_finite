import Tone from 'tone';

const tones = ['=R','-2','+2','-3','+3','-4','=T','+5','-6','+6','-7','+7'];

function seedChord(id) {
  return(
    {
      id: id,
      root: Tone.Frequency('A3'),
      synth: new Tone.PolySynth(8, Tone.Synth).toMaster(),
      intervals: [0,3,7],
      partials: [
          1.0, 0.5, 0.2, 0.0,
          0.0, 0.0, 0.0, 0.0,
          0.0, 0.0, 0.0, 0.0,
          0.0, 0.0, 0.0, 0.0
        ]
    }
  )
}

export function buildRhythm(lastRhythmId, length) {
  let chordList = [];
  for (let i=1; i<=length; i++) {
    chordList.push(seedChord(i))
  }
  return (
    {
      id: lastRhythmId + 1,
      chords: chordList,
      sequence: {}
    }
  )
}

function seedRhythm() {
  return (
    {
      id: 1,
      chords: [seedChord(1),seedChord(2)],
      sequence: {}
    }
  )
}

export function buildSection(lastSectionId) {
  return (
    {
      id: lastSectionId + 1,
      rhythms: [seedRhythm()]
    }
  )
}

function seedSection() {
  return (
    {
      id: 1,
      rhythms: [seedRhythm()]
    }
  )
}

export function seedApp() {
  return (
    {
      sections: [seedSection()]
    }
  )
}
