/**
 * This is for providing song information to
 * children components via context.
 *
 *  needs a context provider?
 *  and a way for song component to send back the chosen song
 */

import { createContext, useState, useContext } from "react";
import { AudioAssetMap } from "../data/musicdb";

export const SongContext = createContext({
  currentSong: { location: null, name: "Nothing Playing" },
  playNewSong: () => {},
});


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
    const asset = AudioAssetMap[songLocation];
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

    const asset = AudioAssetMap[nextSong.location];
    setPlayerState({
      currentSong: { location: asset, name: nextSong.name },
      currentList: currentList,
      currentIndex: newIndex,
    });
  }

  const contextValue = {
    currentSong,
    playNewSong,
    changeTrack,
  };

  return (
    <SongContext.Provider value={contextValue}>{children}</SongContext.Provider>
  );
};

export const useSongPlayer = () => useContext(SongContext);
