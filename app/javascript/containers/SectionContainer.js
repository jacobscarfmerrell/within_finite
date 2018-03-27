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
      return(
        <SectionTile key={section.id}/>
      )
    })
    return (
      <table className='section'>
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
