/**
 *
 *
 * This component takes in all saved songs from a database
 * Song's longpress opens an action button - that action button
 * adds the selected song to the database
 *
 *
 */

import { StyleSheet, Text, View, FlatList } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { useState, useEffect } from "react";

import { getSongListSongs } from "../data/musicdb";
import { addSongToPlaylist } from "../data/musicdb";
import Song from "./Song";

{
}
const SongList = (props) => {
  const db = useSQLiteContext();
  const [songsList, setSongsList] = useState([]);
  const [playSong, setPlaySong] = useState("");

  //we're getting all songs from songlist table and display in flatlist
  useEffect(() => {
    const loadSongs = async () => {
      const allSongs = await getSongListSongs(db);
      //confirm data in logs
      console.log("Fetched Songs:", allSongs);
      setSongsList(allSongs);
    };
    loadSongs();
  }, [db]);

  const handleAddSong = async (name,location) => {
    await addSongToPlaylist(db, name, location);
  };

  function setSong(song) {
    setPlaySong(song);
    props.playSong(playSong);
  }

  return (
    <View style={styles.playlist}>
      <Text style={styles.title}>Songs</Text>
      <FlatList
        style={{ flex: 1 }}
        data={songsList}
        renderItem={({ item }) => (
          <Song
            songName={item.name}
            actionText={"Add Song"}
            songLocation={item.location}
            playSong={setSong}
            actionFunction={handleAddSong}
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
    justifyContent: "center",
    alignContent: "stretch",
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "auto",
  },
});

export default SongList;
