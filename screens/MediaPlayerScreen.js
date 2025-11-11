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