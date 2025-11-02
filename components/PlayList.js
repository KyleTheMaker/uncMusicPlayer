/**
 *
 * This Component is is to display the playList
 * PlayList data should be provided by database
 * longpressing song in playlist will enable button -
 * that button removes song from playlist (remove from playlist table)
 *
 *
 */

import { StyleSheet, Text, View, Pressable, FlatList } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { useState, useEffect } from "react";
import { getPlayListSongs } from "../data/musicdb";

import Song from "./Song";

const PlayList = (props) => {
  const db = useSQLiteContext();
  const [songsList, setSongsList] = useState([]);
  const [playSong, setPlaySong] = useState("");

  //we're getting all songs from playlist table to display in a flatlist
  useEffect(() => {
    const loadSongs = async () => {
      const allSongs = await getPlayListSongs(db);
      //confirm data in logs
      console.log("Fetched Playlist Songs:", allSongs);
      setSongsList(allSongs);
    };
    loadSongs();
  }, [db]);

    const handleRemoveSong = async (name) => {
    await removeSongFromPlaylist(db, name);
  };

  function setSong(song) {
    setPlaySong(song);
    props.playSong(playSong);
  }

  return (
    <View style={styles.playlist}>
      <Text style={styles.title}>Playlist</Text>
      <FlatList
        style={{ flex: 1 }}
        data={songsList}
        renderItem={({ item }) => (
          <Song
            songName={item.name}
            actionText={"Remove Song"}
            songLocation={item.location}
            playSong={setSong}
            actionFunction={handleRemoveSong}
          />
        )}
        keyExtractor={(song) => song.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  playlist: {
    backgroundColor: "#8d3434ff",
    flex: 1,
    justifyContent: "center",
    alignContent: "stretch",
    paddingEnd: 10,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "auto",
  },
  addRemove: {
    marginEnd: 2,
    backgroundColor: "#ffa",
  },
});

export default PlayList;
