import { View, Text, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useState, useContext } from "react";
import { StatusBar } from "expo-status-bar";


import PlayList from "../components/PlayList";

export default function PlaylistScreen() {
  const [playSong, setPlaySong] = useState("");

  function setSong(song) {
    setPlaySong(song);
  }

  return (
    <SafeAreaView
      style={{ flex: 1, flexDirection: "column", overflow: "hidden" }}
    >
      <PlayList playSong={setSong} />

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
  },
});
