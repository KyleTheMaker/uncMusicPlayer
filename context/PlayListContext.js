/**
 * PlayListContext
 * ----------------
 * This context provides global state management for the music player app.
 * It shares playlist data, the list of songs, and the currently playing song
 * across different components and screens (e.g., PlaylistTab and MediaPlayerTab).
 *
 * Exports:
 * - PlayListProvider: Wrap your app with this provider to enable access to playlist state.
 * - usePlaylist: Custom hook to access and update playlist-related state.
 *
 * State Variables:
 * - playlist: Array of playlist objects (e.g., user-created playlists).
 * - songsList: Array of available songs.
 * - playSong: ID or name of the currently playing song.
 *
 * Usage:
 * Use `usePlaylist()` inside any functional component to access or modify the shared state.
 */


import { createContext, useState, useContext } from 'react';

const PlayListContext = createContext();

export const PlayListProvider = ({ children }) => {
  const [playlist, setPlaylist] = useState([]);
  const [songsList, setSongsList] = useState([]);
  const [playSong, setPlaySong] = useState("");

  return (
    <PlayListContext.Provider value={{ playlist, setPlaylist, songsList, setSongsList, playSong, setPlaySong }}>
      {children}
    </PlayListContext.Provider>
  );
};

export const usePlaylist = () => useContext(PlayListContext);