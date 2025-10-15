/** uncMusicPlayer
 *
 *
 * The only functional component is the MediaPlayer
 * SongList and Playlist are just hardcoded flatlists
 * Longpressing a song name opens the button intended for
 * adding or removing a song from a playlist/songlist
 *
 * TODO:
 * List all songs from songlist table into songlist component
 * list all songs from playlist table into playlist component
 * Songlist Longpress function inserts selected song into playlist table
 * Playlist Longpress function removes selected song from playlist table
 *
 *
 */

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";
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
  // get all songs from songlist table and pass it to the songlist component
  // get all songs from playlist table and list in playlist component
  //longpressing song in songlist will enable button to add to playlist (insert into playlist table)
  //longpressing song in playlist will enable button to remove from playlist (remove from playlist table)

  return (
    <SafeAreaProvider>
      <SQLiteProvider databaseName="uncMusic.db" onInit={manageDBIfNeeded}>
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
      </SQLiteProvider>
    </SafeAreaProvider>
  );
}

async function manageDBIfNeeded(db) {
  const DATABASE_VERSION = 1;

  let result = await db.getFirstAsync("PRAGMA user_version");
  let currentDbVersion = result ? result.user_version : 0;

  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }
  if (currentDbVersion === 0) {
    await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS songlist (id INTEGER PRIMARY KEY NOT null, name TEXT UNIQUE NOT null, location TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS playlist (id INTEGER PRIMARY KEY NOT null, name TEXT UNIQUE NOT null, location TEXT NOT NULL);
    INSERT OR IGNORE INTO playlist (name, location) VALUES ("Fuzzy Cats and Mushrooms", "./assets/music/cats-and-mushrooms.mp3");
    INSERT OR IGNORE INTO playlist (name, location) VALUES ("Peaceful Lofi", "./assets/music/peacful-lofi.mp3");
    INSERT OR IGNORE INTO playlist (name, location) VALUES ("Unstoppable Dance", "./assets/music/unstoppable-dance.mp3");
    INSERT OR IGNORE INTO songlist (name, location) VALUES ("Fuzzy Cats and Mushrooms", "./assets/music/cats-and-mushrooms.mp3");
    INSERT OR IGNORE INTO songlist (name, location) VALUES ("Peaceful Lofi", "./assets/music/peacful-lofi.mp3");
    INSERT OR IGNORE INTO songlist (name, location) VALUES ("Unstoppable Dance", "./assets/music/unstoppable-dance.mp3");
    INSERT OR IGNORE INTO songlist (name, location) VALUES ("afrobeat-chill", "./assets/music/afrobeat-chill.mp3");
    INSERT OR IGNORE INTO songlist (name, location) VALUES ("chill-lofi", "./assets/music/chill-lofi.mp3");
    INSERT OR IGNORE INTO songlist (name, location) VALUES ("chill-lounge-lofi", "./assets/music/chill-lounge-lofi.mp3");
    INSERT OR IGNORE INTO songlist (name, location) VALUES ("chillhop-in-new-york", "./assets/music/chillhop-in-new-york.mp3");
    INSERT OR IGNORE INTO songlist (name, location) VALUES ("chillhop-lofi", "./assets/music/chillhop-lofi.mp3");
    INSERT OR IGNORE INTO songlist (name, location) VALUES ("japanese-magic-lofi", "./assets/music/japanese-magic-lofi.mp3");
    INSERT OR IGNORE INTO songlist (name, location) VALUES ("jazzy-lofi-rhythm", "./assets/music/jazzy-lofi-rhythm.mp3");
    `);
    currentDbVersion = 1;
  }
  // if (currentDbVersion === 1) {
  //   Add more migrations
  // }
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
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
