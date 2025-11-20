/** uncMusicPlayer
 *
 *
 * The MediaPlayer Component handles song control and information
 *
 *
 */

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";


import MediaPlayer from "../components/MediaPlayer";


export default function App() {
  return (
    <SafeAreaView
      style={{ flex: 1, flexDirection: "column", overflow: "hidden" }}
    >
      <View style={styles.container}>
        <MediaPlayer />
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  
  screen: {
    flex: 1,
    backgroundColor: "#e0f2fe", // sky-100
  },

  
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 22,

    // Nice smooth sky color
    backgroundColor: "#bae6fd",

    // Soft drop shadow
    shadowColor: "#0284c7",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,

    justifyContent: "center",
  },

  button: {
    margin: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});