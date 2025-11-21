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
import * as MediaLibrary from "expo-media-library";

/**
 * Exploring expo-media-library
 * Not sure it's needed; expo-file-system just got updated with dorectory seletion
 * trying expo-file-system with expo-document-picker again
 */

const FileSelector = () => {
  const [chosenFolder, setChosenFolder] = useState("No File Chosen");
  const [albums, setAlbums] = useState(null);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  async function getAlbums() {
    if (permissionResponse.status !== "granted") {
      await requestPermission();
    }
    const fetchedAlbums = await MediaLibrary.getAlbumsAsync({
      includeSmartAlbums: true,
    });
    setAlbums(fetchedAlbums);
    console.log(fetchedAlbums.filter((album)=>{return album.title == "Music"}));
  }

  //look for Audio files folder on Phone
  const chooseFolder = async () => {
    try {
      const chosenDoc = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: true,
      });
      const folder = new File(chosenDoc.assets[0]);
      console.log("File URI: ", folder.uri);
      const fileName = chosenDoc.assets[0].name;
      console.log("awaited File Name: ", fileName);
      setChosenFolder(fileName);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text>This is the FileSelector Component</Text>
        <Button title="Choose File" onPress={chooseFolder} />
        <Text>Chosen File: {chosenFolder}</Text>
      </View>
      <View style={styles.section}>
        <Button onPress={getAlbums} title="Get albums" />
        <ScrollView>
          {albums &&
            albums.map((album) => <AlbumEntry album={album} key={album.id} />)}
        </ScrollView>
      </View>
    </View>
  );
};

function AlbumEntry({ album }) {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    async function getAlbumAssets() {
      const albumAssets = await MediaLibrary.getAssetsAsync({ album });
      setAssets(albumAssets.assets);
    }
    getAlbumAssets();
    console.log("Assets:", {assets});
  }, [album]);

  return (
    <View key={album.id} style={styles.section}>
      <Text>
        {album.title} - {album.assetCount ?? "no"} assets
      </Text>
      <View style={styles.container}>
        {assets &&
          assets.map((asset) => (
            <View key={asset.id}>
              <Image source={{ uri: asset.uri }} width={50} height={50} />
              <Text>{asset.uri}</Text>
            </View>
          ))}
      </View>
    </View>
  );
}

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
