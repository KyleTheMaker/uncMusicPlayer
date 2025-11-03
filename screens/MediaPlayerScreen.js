/** uncMusicPlayer
 *
 *
 * The MediaPlayer Component handles song control and information
 * SongList lists all songs from the database
 * Playlist lists
 * Longpressing a song name opens the button intended for
 * adding or removing a song from a playlist/songlist
 *
 * TODO:
 * X - List all songs from songlist table into songlist component
 * X - list all songs from playlist table into playlist component
 *  - Songlist Longpress function inserts selected song into playlist table
 *  - Playlist Longpress function removes selected song from playlist table
 *
 *
 */

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";
import { useState } from "react";

import MediaPlayer from "../components/MediaPlayer";
import PlayList from "../components/PlayList";
import SongList from "../components/SongList";
import { manageDBIfNeeded } from "../data/musicdb";

export default function App() {

  /**
   * logic needed for adding selected song
   * 
  */
 const [playSong, setPlaySong] = useState('');

   function setSong(song) {
    setPlaySong(song);
  }

  return (
    <SafeAreaProvider>
      <SQLiteProvider databaseName="uncMusic.db" onInit={manageDBIfNeeded}>
        <SafeAreaView
          style={{ flex: 1, flexDirection: "column", overflow: "hidden" }}
        >
          <View style={styles.container}>
            <MediaPlayer />
          </View>
          <StatusBar style="auto" />
        </SafeAreaView>
      </SQLiteProvider>
    </SafeAreaProvider>
    );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 4,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  button: {
    margin: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});