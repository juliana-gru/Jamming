import React, {useState} from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

const track = {
    id: '1234',
    name: 'Marry me',
    artist: 'Jason Derulo',
    album: 'I am the man'
} 

class App extends React.Component {
  contructor(props) {
    super(props);
    this.state = {
      searchResults: [track, track],
      playlistName: 'My Playlist',
      playlistTracks: [track, track]
    }    
  }
  const [searchResults, setSearchResults] = useState([track, track]);
  const [playlistName, setPlaylistName] = useState('My Playlist');
  const [playlistTracks, setPlaylistTracks] = useState([track,track]);

  const addTrack = track => {
    if (track.id in playlistTracks === true) {
      return;
    }
    setPlaylistTracks(playlistTracks => [...playlistTracks, track]);    
  }

  const removeTrack = track => {
    console.log('removeTrack')
    console.log(track);
    // setPlaylistTracks( 
    //   playlistTracks.filter(currentTrack => {
    //     return track.id !== currentTrack.id ? currentTrack : ''
    //   }))
  }

  const updatePlaylistName = (name) => {
    setPlaylistName(name);
  }
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
        <div className="App-playlist">
          <SearchResults searchResults={searchResults} onAdd={addTrack} />
          <Playlist playlistName={playlistName} playlistTracks={playlistTracks}
          onRemove={removeTrack} onNameChange={updatePlaylistName} />
        </div>
        </div>
      </div>
    )
  }  
}

export default App;
