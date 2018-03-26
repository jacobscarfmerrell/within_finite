import React, { Component } from 'react';
import RhythmContainer from './RhythmContainer';
import SectionShowContainer from './SectionShowContainer';

class SectionIndexContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sectionRhythms: [],
      sections: [],
      currentSection: 0,
      rhythms: []
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({
      currentSection: Number(event.target.id)
    });
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
    let { sections, sectionRhythms, rhythms } = this.state;

    let selectedRhythmIds = [];
    for (let i=0; i<sectionRhythms.length; i++) {
      if (this.state.currentSection == sectionRhythms[i].section_id) {
        selectedRhythmIds.push(sectionRhythms[i].rhythm_id)
      }
    }
    let selectedRhythms = rhythms.filter(rhythm => selectedRhythmIds.includes(rhythm.id));
    return (
      <div>
        <SectionShowContainer
          sections={sections}
          handleClick={this.handleClick}
        />
        <hr />
        <RhythmContainer rhythms={selectedRhythms} />
      </div>
    )
  }
}

export default SectionIndexContainer;
