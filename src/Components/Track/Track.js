import React from 'react';
import './Track.css';

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.renderAction = this.renderAction.bind(this);
    this.playPreview = this.playPreview.bind(this);
    this.state = {
      isPlaying: false
    }
  }

  addTrack() {
    this.props.onAdd(this.props.track);
  }

  removeTrack() {
    this.props.onRemove(this.props.track);
  }

  renderAction() {    
    return this.props.isRemoval 
    ? <button className="Track-action" onClick={this.removeTrack} >-</button> 
    : <button className="Track-action" onClick={this.addTrack} >+</button>        
  }

  playPreview() {    
    if (!this.props.track.preview) {
      console.log('null if');
      document.querySelector('.preview').innerHTML = 'No preview available';
      return;
    }
    //Incomplete
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information" key>
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
          <span className="preview" onClick={this.playPreview}>Preview
          <audio src={this.props.track.preview}></audio>            
          </span>
        </div>
        {this.renderAction()}
      </div>
    )
  }  
}

export default Track;

