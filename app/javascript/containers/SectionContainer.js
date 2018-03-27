import React, { Component } from 'react'
import SectionTile from '../components/SectionTile'

class SectionContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    let sectionTiles = this.props.sections.map((section,index) => {
      return(
          <SectionTile
            key={index+1}
            id={index+1}
            name={String.fromCharCode(index+65)}
            handleClick={this.props.handleClick}
          />
      )
    })
    return (
      <table className='section'>
        <thead>
          <tr>
            {sectionTiles}
          </tr>
        </thead>
      </table>
    )
  }
}

export default SectionContainer;
