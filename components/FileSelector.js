import { Text, Button, Image, View, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import * as FileSystem from "expo-file-system/legacy";
import { Directory, Paths, File } from "expo-file-system";
import { useSongPlayer } from "../context/SongContext";

import Song from "./Song";
import { FlatList } from "react-native-gesture-handler";

/**
 * Folder holding music can be selected
 * audio/mp3 files from folder will be listed
 * clicking will play selected file
 * TODO:
 *  - turn folder items into it's own playlist,
 * where the media play can go back and forth for songs
 * 
 */

const FileSelector = () => {
  const [chosenFolder, setChosenFolder] = useState("No File Chosen");
  const [localSongs, setLocalSongs] = useState([]);
  const [songsList, setSongsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { playNewSong } = useSongPlayer();

  const chooseFolder = async () => {
    setLoading(true);
    setLocalSongs([]);
    try {
      const directory = await Directory.pickDirectoryAsync();
      if(directory.canceled){
        setLoading(false);
        return;
      }
      setChosenFolder(directory.name);
      const directoryItems = directory.list().filter((item) => {
        return item instanceof File && item.type == "audio/mpeg";
      });
      setLocalSongs(directoryItems);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePlaySong = async (songFile, listArray, listIndex) => {
    try {
      if (!(songFile instanceof File)) {
        throw new Error("Invalid file object passed to play handler.");
      }
      // create or access local music directory for copying songFile to
      const localMusicDirectory = new Directory(
        Paths.document,
        "localMusicStorage"
      );

      if (!localMusicDirectory.exists) {
        await localMusicDirectory.create();
      }
      const localSong = new File(localMusicDirectory, songFile.name);

      if (localSong.exists) {
        console.log(`Song already in cache, playing ${localSong.uri}`);
      } else {

        await FileSystem.copyAsync({
          from: songFile.uri,
          to: localSong.uri
        });
        console.log(`Song copied to local cache: ${localSong.name}`);
      }

      playNewSong(localSong.uri, localSong.name, listArray, listIndex);
    } catch (error) {
      console.error("error playing song", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text>This is the FileSelector Component</Text>
        <Button
          title={loading ? "Loading..." : "Choose Folder"}
          onPress={chooseFolder}
          disabled={loading}
        />
        <Text>Chosen Folder: {chosenFolder}</Text>
        <FlatList
          data={localSongs}
          renderItem={({ item, index }) => (
            <Song
              songName={item.name}
              actionText={"Add Song"}
              songLocation={item.uri}
              playSong={() => handlePlaySong(item, songsList, index)}
            />
          )}
          keyExtractor={(item) => item.uri}
        />
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
