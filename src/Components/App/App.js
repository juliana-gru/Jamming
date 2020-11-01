import React, { useState } from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import SpotifyAPI from '../../util/SpotifyAPI';


const App = () => {
  const [ searchResults, setSearchResults ] = useState([]);
  const [ playlistName, setPlaylistName ] = useState('My Playlist');
  const [ playlistTracks, setPlaylistTracks ] = useState([]); 
 
  const addTrack = track => {
    if (playlistTracks.some(playlistTrack => playlistTrack.id === track.id)) return;
    else setPlaylistTracks([...playlistTracks, track]);      
  };

  const removeTrack = track => {
    setPlaylistTracks(playlistTracks.filter(currentTrack => 
      currentTrack.id !== track.id));   
  };

  const updatePlaylistName = name => setPlaylistName(name);    

  const savePlaylist = () => {
    const tracksURIs = playlistTracks.map(track => track.uri);

    SpotifyAPI.savePlaylist(playlistName, tracksURIs).then(() => {
      updatePlaylistName('New Playlist');
      setPlaylistTracks([]);
    });      
  };

  const search = term => {
    // Stop playing preview audios when search is refreshed
    // if (!document.querySelectorAll('audio')) return;
    // document.querySelectorAll('audio').forEach(audio => audio.pause());
    
    //Executes search
    SpotifyAPI.search(term).then(tracks => setSearchResults(tracks));    
  };
  
  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar onSearch={search} />

        <div className="App-playlist">
          <SearchResults 
            searchResults={searchResults} 
            onAdd={addTrack} 
          />
          <Playlist 
            playlistName={playlistName} 
            playlistTracks={playlistTracks}
            onRemove={removeTrack} 
            onNameChange={updatePlaylistName} 
            onSave={savePlaylist} 
          />
        </div>

      </div>
    </div>
  )    
}

export default App;
