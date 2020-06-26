import React from 'react';
import './Playlist.css';

import TrackList from '../TrackList/TrackList';

const Playlist = (playlistName, playlistTracks, onRemove) => {
  return (
    <div className="Playlist">
      <input defaultValue={playlistName}/>
      <TrackList onRemove={onRemove} isRemoval='true' />
      <button className="Playlist-save">SAVE TO SPOTIFY</button>
    </div>
  )  
}
//tracks={playlistTracks}

export default Playlist;