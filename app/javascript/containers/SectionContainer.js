import React, { Component } from 'react'
import SectionTile from '../components/SectionTile'

class SectionContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    return (
      <table className='section'>
        <thead>
          <tr>
            <td>section tiles go here</td>
          </tr>
        </thead>
      </table>
    )
  }
}

export default SectionContainer;
