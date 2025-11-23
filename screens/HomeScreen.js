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

  screen: {
    flex: 1,
    backgroundColor: "#f0fdfa",
  },

  container: {
    paddingBottom: 10,
    marginBottom: 10,
  },

  headerWrapper: {
    marginTop: 20,
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 18,

    backgroundColor: "#a7f3d0",

    shadowColor: "#0d9488",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,

    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 0.8,
    color: "#064e3b",
    textTransform: "uppercase",
  },

  content: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingBottom: 8,
  },

  button: {
    margin: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
