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
      let className = 'mdl-button mdl-js-button mdl-button--raised mdl-button--accent ';
      if (this.props.selectedSection != null) {
        if (this.props.selectedSection.id == section.id) {
          className += 'selected';
        }
      }

      return(
        <SectionTile
          key={section.id}
          id={section.id}
          name={String.fromCharCode(section.id+64)}
          handleClick={this.props.handleClick}
          className={className}
          deleteHandler={this.props.deleteHandler}
        />
      )
    })
    return (
      <ul className='section-container'>
        {
          this.props.createHandler &&
          <li onClick={this.props.createHandler}><i className="material-icons delete-section-button">add</i></li>
        }
        {sections}
      </ul>
    )
  }
}

export default SectionContainer;
