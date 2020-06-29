const clientID = '76dbd79e03ee41608177aef38c46774c';
//const redirectURI = encodeURIComponent('http://localhost:3000');
const redirectURI = encodeURIComponent('https://my-jamming.surge.sh');

let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken === true) {
      console.log('if');
      return accessToken;      
    } 
    else {
      console.log('else');
      window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&scope=playlist-modify-public&response_type=token`;
      
      accessToken = window.location.hash.match(/access_token=([^&]*)/)[1];
      const expirationTime = window.location.href.match(/expires_in=([^&]*)/)[1];
      console.log(accessToken);
      console.log(expirationTime);
      window.setTimeout(() => accessToken = '', expirationTime * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    }
  },

  search(term) {    
    Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {'Authorization': 'Bearer ' + accessToken}
    })
    .then(response => response.json())
    .then(jsonResponse => {
      if (jsonResponse.tracks) {
        return jsonResponse.tracks.map( track => ({          
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            URI: track.uri
        }))
      } else {
        jsonResponse.tracks = [];
      }
    })        
  },

  savePlaylist(playlistName, trackURIs) {
    if (playlistName === false || trackURIs === false) {
      return;
    }

    const userToken = accessToken;    
    const headers = { 'Authorization': 'Bearer ' + userToken};
    let userID;
    let playlistID;
    
    //Get USER ID
    fetch(`https://api.spotify.com/v1/me`, {headers: headers})
    .then(response => response.json())
    .then(jsonResponse => userID = jsonResponse.id)

    //Creates Playlist
    fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
      headers: {
        'Authorization': 'Bearer ' + userToken,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({name: playlistName})      
    }).then(response => response.json())
    .then(jsonResponse => playlistID = jsonResponse.id)
    
    //Add tracks to the created playlist
    fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        uris: trackURIs
      })
    })
  }
};

export default Spotify;