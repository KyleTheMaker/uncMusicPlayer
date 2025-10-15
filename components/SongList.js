/**
 *
 *
 * This component takes in all saved songs from a database
 * currently it has all songs fron assets listed
 *
 *
 */

import { StyleSheet, Text, View, FlatList } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { useState, useEffect } from "react";
import Song from "./Song";

{
  /*
***Component Information***
Song list should be provided by parent
add to playlist pressable should be handled by parent via hook
*/
}
const SongList = () => {
  const db = useSQLiteContext();
  const [songsList, setSongsList] = useState([]);

  //we're getting all songs from songlist table and display in flatlist
  useEffect(() => {
    const loadSongs = async () => {
      try {
        const allSongs = await db.getAllAsync("SELECT * FROM songlist");
        //confirm data in logs
        console.log("Fetched Songs:", allSongs);

        setSongsList(allSongs);
      } catch (error) {
        console.error("Failed to fetch songs:", error);
      }
    };
    loadSongs();
  }, [db]);

  return (
    <View style={styles.playlist}>
      <Text style={styles.title}>Songs</Text>
      <FlatList
        style={{ flex: 1 }}
        data={songsList}
        renderItem={({ item }) => (
          <Song song={item.name} actionText={"Add Song"} />
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
