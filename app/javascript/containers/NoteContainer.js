import React, { Component } from 'react'
import NoteTile from '../components/NoteTile'

class NoteContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    return (
      <NoteTile />
    )
  }
}

export default NoteContainer;
