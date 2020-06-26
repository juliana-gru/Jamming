import React from 'react';
import './TrackList.css';

import Track from '../Track/Track';

const TrackList = (tracks, onAdd, isRemoval, onRemove) => {
  return (
    <div className="TrackList">
      {console.log(tracks)}
      <Track track={tracks} />
      <Track track={tracks} />

      {/* {tracks.map(track => {
        return <Track track={track} key={track.id} onAdd={onAdd} 
        onRemove={onRemove} isRemoval={isRemoval} />
      })} */}
      
    </div>
  )
}

export default TrackList;