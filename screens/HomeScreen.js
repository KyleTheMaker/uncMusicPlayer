/** HomeScreen
 * currently displays songs from SongList
 *
 *
 */

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";
import { useState } from "react";

import SongList from "../components/SongList";
import { manageDBIfNeeded } from "../data/musicdb";

export default function App() {
  const [playSong, setPlaySong] = useState("");

  function setSong(song) {
    setPlaySong(song);
  }

  return (
      <SafeAreaView
        style={{ flex: 1, flexDirection: "column", overflow: "hidden" }}
      >
        <View style={styles.container}>
          <Header />
        </View>
        <View
          style={{ flexDirection: "row", flex: 1, justifyContent: "center" }}
        >
          <SongList playSong={setSong} />
        </View>
        <StatusBar style="auto" />
      </SafeAreaView>
  );
}

const Header = () => {
  return (
    <View>
      <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 16, marginTop:12, }}>
        uncMusicPlayer
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
