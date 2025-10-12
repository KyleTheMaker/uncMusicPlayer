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
} from "react-native";
import { useState } from "react";
import Song from "./Song";

{
  /*
***Component Information***
Song list should be provided by parent
remove pressable should be handled by parent via hook
*/
}
const PlayList = () => {
  const [listPlaylist, addPlaylist] = useState([
    { id: 0, name: "Fuzzy Cats and Mushrooms" },
    { id: 1, name: "Peaceful Lofi" },
    { id: 2, name: "Unstoppable Dance" },
  ]);
  return (
    <View style={styles.playlist}>
      <Text style={styles.title}>Playlist</Text>
      {listPlaylist.map((song) => (
        <Song
          key={song.id}
          song={song.name}
          remove={styles.addRemove}
          actionText={"Remove Song"}
        />
      ))}
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
