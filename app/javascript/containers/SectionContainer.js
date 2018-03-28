import React, { Component } from 'react'
import SectionTile from '../components/SectionTile'

class SectionContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    let sections = this.props.sections.map(section => {
      let className = 'section-tile ';
      if (this.props.selectedSection.id == section.id) {
        className += 'selected';
      }
      return(
        <SectionTile
          key={section.id}
          id={section.id}
          name={String.fromCharCode(section.id+64)}
          handleClick={this.props.handleClick}
          className={className}
        />
      )
    })
    return (
      <table className='section-container'>
        <tbody>
          <tr>
            {sections}
          </tr>
        </tbody>
      </table>
    )
  }
}

export default SectionContainer;
