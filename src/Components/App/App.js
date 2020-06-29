import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'My Playlist',
      playlistTracks: [],
      spotifyPlaylist: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);    
  }

  addTrack(track) {
    if (this.state.playlistTracks.some(playlistTrack => playlistTrack.id === track.id)) {
        return;
    } else {
      this.setState({
        playlistTracks: [...this.state.playlistTracks, track]
      })
    }     
  }

  removeTrack(track) {
    this.setState({
      playlistTracks: this.state.playlistTracks.filter(currentTrack => {
        return currentTrack.id !== track.id ? currentTrack : '';
      })
    })    
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    })
  }

  savePlaylist() {
    this.setState({
      spotifyPlaylist: this.state.playlistTracks.map(track => {
      return track.URI;
      })
    })
    Spotify.savePlaylist(this.state.playlistName, this.state.spotifyPlaylist)
    .then(this.setState({
      playlistName: 'New Playlist',
      playlistTrack: []
    }))
  }

  search(term) {
    Spotify.search(term).then(tracks => {
      this.setState({
        searchResults:tracks
      })
    })
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
        <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
          <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}
          onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
        </div>
        </div>
      </div>
    )
  }  
}

export default App;
