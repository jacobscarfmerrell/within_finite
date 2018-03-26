import React, { Component } from 'react';
import RhythmContainer from './RhythmContainer';
import SectionShowContainer from './SectionShowContainer';
import { Link } from 'react-router';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      view: 'formRhythm',
      sectionRhythms: [],
      sections: [],
      rhythms: [],
      currentSection: 0,
      currentRhythm: 0
    }
    this.handleSectionClick = this.handleSectionClick.bind(this);
    this.handleRhythmClick = this.handleRhythmClick.bind(this);
  }

  handleSectionClick(event) {
    this.setState({
      currentSection: Number(event.target.id)
    });
  }

  handleRhythmClick(event) {
    if (this.state.view == 'formRhythm') {
      this.setState({
        view: 'rhythmChord',
        currentRhythm: Number(event.currentTarget.id)
      })
    }
  }

  componentDidMount() {
    fetch('/api/v1/sections')
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      this.setState({
        sections: body['sections'],
        rhythms: body['rhythms'],
        sectionRhythms: body['section_rhythms']
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let { sections, sectionRhythms, rhythms, view} = this.state;
    let display;

    if (view == 'formRhythm') {
      let selectedRhythmIds = [];
      let selectedSectionIds = [];
      for (let i=0; i<sectionRhythms.length; i++) {
        if (this.state.currentSection == sectionRhythms[i].section_id) {
          selectedRhythmIds.push(sectionRhythms[i].rhythm_id)
        }
        selectedSectionIds.push(sectionRhythms[i].section_id)
      }
      let selectedRhythms = rhythms.filter(rhythm => selectedRhythmIds.includes(rhythm.id));

      display = <div><SectionShowContainer sections={sections} handleClick={this.handleSectionClick}
      /><hr /><RhythmContainer rhythms={selectedRhythms} handleClick={this.handleRhythmClick} /></div>;
    }
    else if (view == 'rhythmChord') {
      // selecting the right rhythm
      let selectedRhythmId = this.state.currentRhythm;
      let selectedRhythm = [];
      for (let i=0; i<rhythms.length; i++) {
        if (selectedRhythmId == rhythms[i].id) {
          selectedRhythm.push(rhythms[i])
        }
      }

      display = <div><RhythmContainer rhythms={selectedRhythm} handleClick={this.handleRhythmClick} /><hr/></div>;
    }

    return (
      <div>
        {display}
      </div>
    )
  }
}

export default App;
