import { Text, Button, Image, View } from "react-native";
import { useState, useEffect } from "react";
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

const FileSelector = () => {

    //look for Audio files folder on Phone
        const chooseFolder = async () => {
            const chosenDoc = await DocumentPicker.getDocumentAsync();
            console.log(chosenDoc.assets);
        }
        return (
    <View>
      <Text>This is the FileSelector Component</Text>
      <Button title="Choose Folder" onPress={chooseFolder} />
    </View>
  );

};

export default FileSelector;
