/**
 *
 * This Component is is to display the playList
 * longpressing song in playlist will enable button -
 * that button removes song from playlist (remove from playlist table)
 *
 *
 */

import { StyleSheet, Text, View, Pressable, FlatList } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { useState, useEffect, useCallback } from "react";
import { getPlayListSongs, removeSongFromPlaylist } from "../data/musicdb";
import { useFocusEffect } from "@react-navigation/native";
import { useSongPlayer } from "../context/SongContext";

import Song from "./Song";

const PlayList = (props) => {
  const db = useSQLiteContext();
  const [songsList, setSongsList] = useState([]);
  const { playNewSong } = useSongPlayer();

  //we're getting all songs from playlist table to display in a flatlist
  // useEffect(() => {
  //   loadSongs();
  // }, [db]);

  useFocusEffect(
    useCallback(() => {
      loadSongs();
    }, [])
  );

  const loadSongs = async () => {
    const allSongs = await getPlayListSongs(db);
    setSongsList(allSongs);
  };

  const handleRemoveSong = async (name) => {
    //remove chosen song from list
    const newList = songsList.filter((song) => song.name !== name);
    setSongsList(newList);
    try {
      await removeSongFromPlaylist(db, name);
    } catch (error) {
      console.log("Error removing song from db: ", error);
      loadSongs();
    }
  };

  const handlePlaySong = (location, name, listArray, listIndex) => {
    playNewSong(location, name, listArray, listIndex);
  };

  return (
    <View style={styles.playlist}>
      <Text style={styles.title}>Playlist</Text>
      <FlatList
        style={{ flex: 1 }}
        data={songsList}
        renderItem={({ item, index }) => (
          <Song
            songName={item.name}
            actionText={"Remove Song"}
            songLocation={item.location}
            playSong={(location, name) =>
              handlePlaySong(location, name, songsList, index)
            }
            actionFunction={() => handleRemoveSong(item.name)}
          />
        )}
        keyExtractor={(song) => song.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  playlist: {
    flex: 1,
    paddingHorizontal: 8,
    paddingTop: 4,
    backgroundColor: "transparent",
  },
  title: {
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 8,
    fontSize: 20,
    color: "#064e3b",
  },
  addRemove: {
    marginEnd: 2,
    backgroundColor: "#a7f3d0",
  },
});

export default PlayList;
