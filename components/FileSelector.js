import { Text, Button, Image, View, StyleSheet, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import * as DocumentPicker from "expo-document-picker";
import { Directory, Paths } from "expo-file-system";
import * as MediaLibrary from 'expo-media-library';

/**
 * Exploring expo-media-library
 */

const FileSelector = () => {
  const [chosenFolder, setChosenFolder] = useState();
  const [albums, setAlbums] = useState(null);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  async function getAlbums() {
    if (permissionResponse.status !== 'granted') {
      await requestPermission();
    }
    const fetchedAlbums = await MediaLibrary.getAlbumsAsync({
      includeSmartAlbums: true,
    });
    setAlbums(fetchedAlbums);
  }

  return (
    <View style={styles.container}>
      <Button onPress={getAlbums} title="Get albums" />
      <ScrollView>
        {albums && albums.map((album) => <AlbumEntry album={album} />)}
      </ScrollView>
    </View>
  );

  // //look for Audio files folder on Phone
  // const chooseFolder = async () => {
  //   try {
  //     const chosenDoc = await DocumentPicker.getDocumentAsync();
  //     const info = await Directory;
  //     console.log("awaited File Name: ", chosenDoc.assets[0].name);
  //     setChosenFolder(chosenDoc);
  //     console.log("Directory inspect: " + info.name);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // return (
  //   <View>
  //     <Text>This is the FileSelector Component</Text>
  //     <Text>
  //       Chosen File: {chosenFolder ? toString(chosenFolder) : "No File Chosen."}
  //     </Text>
  //     <Button title="Choose File" onPress={chooseFolder} />
  //   </View>
  // );
};

function AlbumEntry({ album }) {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    async function getAlbumAssets() {
      const albumAssets = await MediaLibrary.getAssetsAsync({ album });
      setAssets(albumAssets.assets);
    }
    getAlbumAssets();
  }, [album]);

  return (
    <View key={album.id} style={styles.container}>
      <Text>
        {album.title} - {album.assetCount ?? 'no'} assets
      </Text>
      <View style={styles.container}>
        {assets && assets.map((asset) => (
          <Image source={{ uri: asset.uri }} width={50} height={50} />
        ))}
      </View>
    </View>
  );
}

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
});

export default FileSelector;
