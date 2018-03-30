import Tone from 'tone';

const tones = ['=R','-2','+2','-3','+3','-4','=T','+5','-6','+6','-7','+7'];
function note(fundamental) {
  return (
    { volume: 0.0,
      id: tones[fundamental-1],
      fundamental: fundamental,
      harmonics: [
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0
      ]
    }
  )
}

function notes(num) {
  let notes = [];
  for (let i=1; i<=num; i++) {
    notes.push(note(i));
  }
  return notes;
}

function chord(id) {
  let partials;
  if (id%2 == 0) {
    partials = [
      1.0, 0.5, 0.2, 0.0,
      0.0, 0.0, 0.0, 0.0,
      0.0, 0.0, 0.0, 0.0,
      0.0, 0.0, 0.0, 0.0
    ]
  }
  else {
    partials = [
      0.5, 0.4, 0.2, 0.4,
      0.0, 0.0, 0.3 , 0.0,
      0.0, 0.0, 0.0, 0.0,
      0.0, 0.2, 0.3, 0.5
    ]
  }
  return(
    {
      id: id,
      notes: notes(12),
      root: Tone.Frequency('A3'),
      synth: new Tone.PolySynth(8, Tone.Synth).toMaster(),
      notes2: [Tone.Frequency('A3'),Tone.Frequency('C4'),Tone.Frequency('E4'),Tone.Frequency('G4')],
      partials: partials
    }
  )
}

function rhythm(divisor, id) {
  let steps = [];
  for (let i=1; i<=divisor; i++) {
    steps.push(chord(i))
  }
  return (
    {
      id: id,
      chords: steps
    }
  )
}

function section(numRhythms, id) {
  let rhythmList = [];
  for (let i=1; i<=numRhythms; i++) {
    rhythmList.push(rhythm(4, i))
  }
  return (
    {
      id: id,
      rhythms: rhythmList
    }
  )
}

export function app(numSections) {
  let sectionList = [];
  for (let i=1; i<=numSections; i++) {
    sectionList.push(section(2, i))
  }
  return (
    {
      sections: sectionList
    }
  )
}
