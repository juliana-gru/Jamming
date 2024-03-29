const clientID = '76dbd79e03ee41608177aef38c46774c';
//const redirectURI = encodeURIComponent('http://localhost:3000/');
const redirectURI = encodeURIComponent('https://jammmingwithspotify.netlify.app');

let accessToken;

const SpotifyAPI = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;      
    }
    
    const accessTokenInURL = window.location.hash.match(/access_token=([^&]*)/);
    const expirationTimeInURL = window.location.hash.match(/expires_in=([^&]*)/);

    if (accessTokenInURL && expirationTimeInURL) {            
      accessToken = accessTokenInURL[1];
      const expirationTime = Number(expirationTimeInURL[1])
      window.setTimeout(() => accessToken = '', expirationTime * 1000);
      window.location.hash = '';
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    }
    else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&scope=playlist-modify-public&response_type=token`;
    }
  },

  search(term) {    
    const accessToken = SpotifyAPI.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(term)}`, {
      headers: {Authorization: `Bearer ${accessToken}`}
    })
    .then(response => response.json())
    .then(jsonResponse => {
      if (jsonResponse.tracks) {
        return jsonResponse.tracks.items.map( track => ({          
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri,
            preview: track.preview_url
        }))
      } else {
        jsonResponse.tracks = [];
      }
    })        
  },

  savePlaylist(playlistName, trackURIs) {
    if (!playlistName || !trackURIs.length) {
      return;
    }
    const accessToken = SpotifyAPI.getAccessToken();
   
    const headers = { Authorization: `Bearer ${accessToken}`};
    let userID;
    
    // #1 Get USER ID
    return fetch('https://api.spotify.com/v1/me', {headers: headers})
    .then(response => response.json())
    .then(jsonResponse => {
      userID = jsonResponse.id;
      
    // #2 Creates Playlist
      return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
        headers: { 
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({name: playlistName})      
      }).then(response => response.json())
      .then(jsonResponse => {
        const playlistID = jsonResponse.id
        
    // #3 Add tracks to the created playlist
        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
          headers: { 
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({uris: trackURIs})
        });
      });    
    });    
  }
};

export default SpotifyAPI;