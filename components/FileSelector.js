import {
  Text,
  Button,
  Image,
  View,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import * as DocumentPicker from "expo-document-picker";
import { Directory, Paths, File } from "expo-file-system";
import { useSongPlayer } from "../context/SongContext";

import Song from "./Song";
// import * as MediaLibrary from "expo-media-library";

/**
 * Exploring expo-media-library
 * Not sure it's needed; expo-file-system just got updated with dorectory seletion
 * trying expo-file-system with expo-document-picker again
 */

const FileSelector = () => {
  const [chosenFolder, setChosenFolder] = useState("No File Chosen");
  const [localSongs, setLocalSongs] = useState([]);
  const [songsList, setSongsList] = useState([]);
  const { playNewSong } = useSongPlayer();

  //look for Audio files folder on Phone
  const chooseFolder = async () => {
    try {
      const directory = await new Directory.pickDirectoryAsync();
      const directoryItems = directory.list().filter((item) => {
        return item.type == "audio/mpeg";
      });
      setLocalSongs(directoryItems);
      console.log(directoryItems);
    } catch (error) {
      console.error(error);
    }
  };
  const handlePlaySong = (location, name, listArray, listIndex) => {
    playNewSong(location, name, listArray, listIndex);
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text>This is the FileSelector Component</Text>
        <Button title="Choose File" onPress={chooseFolder} />
        <Text>Chosen File: {chosenFolder}</Text>
        <ScrollView>
          {localSongs &&
            localSongs.map((song, index) => (
              <Song
                songName={song.name}
                actionText={"Remove Song"}
                songLocation={song.uri}
                playSong={(location, name) =>
                  handlePlaySong(location, name, songsList, index)
                }
                key={song.md5}
              />
            ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
    marginBottom: 10,
    marginStart: 8,
    marginEnd: 8,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center",
  },
  section: {
    marginBlock: 4,
  },
});

export default FileSelector;
