import React, { Component } from 'react';
import RhythmTile from '../components/RhythmTile';

class RhythmContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    let rhythms = this.props.rhythms.map(rhythm => {
      let className = 'mdl-button mdl-js-button mdl-button--raised mdl-button--accent rhythm-tile '
      if (this.props.selectedRhythm != null) {
        if (this.props.selectedRhythm.id == rhythm.id) {
          className += 'rhythm-selected '
        }
      }
      return(
        <RhythmTile
          key={rhythm.id}
          id={rhythm.id}
          handleClick={this.props.handleClick}
          className={className}
          divisor={rhythm.chords.length}
          selectedChordId={this.props.selectedChordId}
          deleteHandler={this.props.deleteHandler}
        />
      )
    })
    return (
      <ul className='rhythm-container'>
        {
          this.props.createHandler &&
          <form onSubmit={this.props.createHandler} id="rhythm-form">
            <input type="number" min="1" max="16" required/>
            <button type="submit" >
              <i className="material-icons add-rhythm-button">add</i>
            </button>
          </form>
        }
        {rhythms}
      </ul>
    )
  }
}

export default RhythmContainer;
