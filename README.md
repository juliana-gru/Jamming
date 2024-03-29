[![Netlify Status](https://api.netlify.com/api/v1/badges/8cec6385-ec1a-4899-bdf5-ae492291e987/deploy-status)](https://app.netlify.com/sites/jammmingwithspotify/deploys)
# Jamming

### About it:
Web app that allows user to grant the app access to some resources in their Spotify account for the purposes of searching for songs, creating a custom playlist, then saving it to user's Spotify account. Access is granted through OAuth 2.0.

This project is part of Codecademy's course 'Create a front-end app with React' and was originally created with ReactJS using class components. 
I've refactored the code to function components using React Hooks.

Deployed with Netlify to: https://jammmingwithspotify.netlify.app

### User stories:
- Can link their spotify account (have to to gain access to the app's functionalities)
- Can perform searches for tracks, artists, albuns and playlists
- Can add and remove songs to a customized playlist
- Can rename the playlist
- Can save the playlist to their spotify account.

### Additional features I've added:
- User can play previews of songs (if made available by the Spotify API)
- User can execute a search when pressing 'Enter' on the search bar
- Saves your first search term to local storage so user doesn't have to repeat the search when being redirected from the Spotify auth page.
- Added meta tags to improve SEO

