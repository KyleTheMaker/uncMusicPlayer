/**
 * 
 * 
 * This component takes in all saved songs from a database
 * currently it has all songs fron assets listed
 * 
 * 
*/

import { StyleSheet, Text, View, FlatList } from "react-native";
import { useState } from "react";
import Song from "./Song";

{
  /*
***Component Information***
Song list should be provided by parent
add to playlist pressable should be handled by parent via hook
*/
}
const SongList = () => {
  const songNames = [
    { id: 0, name: "Fuzzy Cats and Mushrooms" },
    { id: 1, name: "Peaceful Lofi" },
    { id: 2, name: "Unstoppable Dance" },
    { id: 3, name: "afrobeat-chill" },
    { id: 4, name: "cats-and-mushrooms" },
    { id: 5, name: "chill-lofi" },
    { id: 6, name: "chill-lounge-lofi" },
    { id: 7, name: "chillhop-in-new-york" },
    { id: 8, name: "chillhop-lofi" },
    { id: 9, name: "japanese-magic-lofi" },
    { id: 10, name: "jazzy-lofi-rhythm" },
    { id: 11, name: "peaceful-lofi" },
    { id: 12, name: "unstoppable-dance" },
  ];
  return (
    <View style={styles.playlist}>
      <Text style={styles.title}>Songs</Text>
      {/* {songNames.map((song) => (
        <Song key={song.id} song={song.name} />
      ))} */}

      {/* testing FlatList Component Below - trouble rendering song names */}
      <FlatList
        style={{ flex: 1 }}
        data={songNames}
        renderItem={({ item }) => (
          <Song song={item.name} actionText={"Add Song"} />
        )}
        keyExtractor={(song) => song.id}
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
