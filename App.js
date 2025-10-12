/** uncMusicPlayer
 * 
 * 
 * The only functional component is the MediaPlayer
 * SongList and Playlist are just hardcoded flatlists
 * Longpressing a song name opens the button intended for
 * adding or removing a song from a playlist/songlist
 * 
 * 
 */

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

import MediaPlayer from "./components/MediaPlayer";
import PlayList from "./components/PlayList";
import SongList from "./components/SongList";

const audioSources = [
  require("./assets/music/cats-and-mushrooms.mp3"),
  require("./assets/music/peaceful-lofi.mp3"),
  require("./assets/music/unstoppable-dance.mp3"),
];
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

export default function App() {

  
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{ flex: 1, flexDirection: "column", overflow: "hidden" }}
      >
        <View style={styles.container}>
          <Header />
          <MediaPlayer />
        </View>
        <View
          style={{ flexDirection: "row", flex: 1, justifyContent: "center" }}
        >
          <PlayList />
          <SongList />
        </View>
        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const Header = () => {
  return (
    <View>
      <Text style={{ textAlign: "center", fontWeight: "bold" }}>
        Music Player
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // flexDirection: "column",
    paddingBottom: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center",
  },
  button: {
    margin: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
