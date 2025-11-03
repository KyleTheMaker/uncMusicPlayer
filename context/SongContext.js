/**
 * This is for providing song information to
 * children components via context.
 *
 *  needs a context provider?
 *  and a way for song component to send back the chosen song
 */

import { createContext, useState, useContext } from "react";

export const SongContext = createContext({
  currentSong: { location: null, name: "Nothing Playing" },
  playNewSong: () => {},
});

const audioAssetMap = {
  "./assets/music/afrobeat-chill.mp3": require("./assets/music/afrobeat-chill.mp3"),
  "./assets/music/cats-and-mushrooms.mp3": require("./assets/music/cats-and-mushrooms.mp3"),
  "./assets/music/chill-lofi.mp3": require("./assets/music/chill-lofi.mp3"),
  "./assets/music/chill-lounge-lofi.mp3": require("./assets/music/chill-lounge-lofi.mp3"),
  "./assets/music/chillhop-in-new-york.mp3": require("./assets/music/chillhop-in-new-york.mp3"),
  "./assets/music/chillhop-lofi.mp3": require("./assets/music/chillhop-lofi.mp3"),
  "./assets/music/japanese-magic-lofi.mp3": require("./assets/music/japanese-magic-lofi.mp3"),
  "./assets/music/jazzy-lofi-rhythm.mp3": require("./assets/music/jazzy-lofi-rhythm.mp3"),
  "./assets/music/peaceful-lofi.mp3": require("./assets/music/peaceful-lofi.mp3"),
  "./assets/music/unstoppable-dance.mp3": require("./assets/music/unstoppable-dance.mp3"),
};

export const SongProvider = ({ children }) => {
  const [playerState, setPlayerState] = useState({
    currentSong: {
      location: null,
      name: "Nothing Playing",
    },
    currentList: [],
    currentIndex: -1,
  });

  const {currentSong, currentList, currentIndex} = playerState;

  function playNewSong(songLocation, songName, listArray, listIndex) {
    const asset = audioAssetMap[songLocation];
    if (asset) {
      //sets the require function in the location
      setPlayerState({
        currentSong: { location: asset, name: songName },
        currentList: listArray,
        currentIndex: listIndex,
      });
    } else {
      console.log("error finding song at location: ", songLocation);
    }
  }

  function changeTrack(direction) {
    const { currentList, currentIndex } = playerState;

    if (currentList.length === 0) return;

    let newIndex = currentIndex + direction;

    if (newIndex >= currentList.length) {
      newIndex = 0;
    } else if (newIndex < 0) {
      newIndex = currentList.length - 1;
    }

    const nextSong = currentList[newIndex];

    const asset = audioAssetMap[nextSong.location];
    setPlayerState({
      currentSong: { location: asset, name: nextSong.name },
      currentList: currentList,
      currentIndex: newIndex,
    });
  }

  const contextValue = {
    currentSong,
    playNewSong, //update function for song component
    changeTrack,
  };

  return (
    <SongContext.Provider value={contextValue}>{children}</SongContext.Provider>
  );
};

export const useSongPlayer = () => useContext(SongContext);
