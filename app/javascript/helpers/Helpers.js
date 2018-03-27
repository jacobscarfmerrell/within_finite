function note(fundamental) {
  return (
    { volume: 0.0,
      id: fundamental,
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
  return(
    {
      id: id,
      notes: notes(12)
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
    rhythmList.push(rhythm(2, i))
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
