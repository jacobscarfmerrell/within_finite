function note(fundamental) {
  return (
    { volume: 0.0,
      fundamental: fundamental,
      harmonics: [
        0.0,
        0.0,
        0.0,
        0.0,
        0.0,
        0.0,
        0.0,
        0.0,
        0.0,
        0.0,
        0.0,
        0.0,
        0.0,
        0.0,
        0.0
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

const CHORD = {
  chord: {
    notes: notes(12)
  }
}

export function rhythm(divisor) {
  let steps = [];
  for (let i=1; i<=divisor; i++) {
    steps.push(Object.assign({}, CHORD))
  }
  return (
    {
      chords: steps
    }
  )
}
