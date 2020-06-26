import React from 'react';
import './Track.css';

const Track = (track, onAdd, onRemove, isRemoval) => {

  const addTrack = track => {
    //onAdd(track);
    console.log(track);
    console.log(onAdd);
  }

  const removeTrack = track => {
    //onRemove(track);
    console.log(track);
    console.log(onRemove);
  }

  const renderAction = () => {
      return isRemoval ? <button className="Track-action" onClick={addTrack}>+</button> 
      : <button className="Track-action" onClick={removeTrack}>-</button>
  }

  return (
    <div className="Track">
      <div className="Track-information">
        <h3>{track.searchResults.name}</h3>
        <p>{track.artist} | {track.album}</p>
      </div>
        {renderAction}
    </div>
  )
}

export default Track;

