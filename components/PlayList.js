/**
 *
 * This Component is is to display the playList
 *  Currently useState array for managing the playlist
 *  Long term should use database for custom playlists
 *
 *
 *
 *
 */

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  FlatList
} from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { useState, useEffect } from "react";
import Song from "./Song";

{
  /*
***Component Information***
Song list should be provided by parent
remove pressable should be handled by parent via hook
// get all songs from playlist table and list in playlist component
//longpressing song in playlist will enable button to remove from playlist (remove from playlist table)
*/
}
const PlayList = () => {
  const [listPlaylist, addPlaylist] = useState([
    { id: 0, name: "Fuzzy Cats and Mushrooms" },
    { id: 1, name: "Peaceful Lofi" },
    { id: 2, name: "Unstoppable Dance" },
  ]);

  const db = useSQLiteContext();
  const [songsList, setSongsList] = useState([]);

  //we're getting all songs from playlist table and display in flatlist
  useEffect(() => {
    const loadSongs = async () => {
      try {
        const allSongs = await db.getAllAsync("SELECT * FROM playlist");
        //confirm data in logs
        console.log("Fetched Playlist Songs:", allSongs);

        setSongsList(allSongs);
      } catch (error) {
        console.error("Failed to fetch songs:", error);
      }
    };
    loadSongs();
  }, [db]);

  return (
    <View style={styles.playlist}>
      <Text style={styles.title}>Playlist</Text>
      <FlatList
        style={{ flex: 1 }}
        data={songsList}
        renderItem={({ item }) => (
          <Song song={item.name} actionText={"Remove Song"} />
        )}
        keyExtractor={(song) => song.id.toString()}
      />
      {/* {listPlaylist.map((song) => (
        <Song
          key={song.id}
          song={song.name}
          remove={styles.addRemove}
          actionText={"Remove Song"}
        />
      ))} */}
    </View>
  );
};

const styles = StyleSheet.create({
  playlist: {
    backgroundColor: "#8d3434ff",
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
