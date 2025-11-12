import { View, Text, StyleSheet } from "react-native";
import FileSelector from "../components/FileSelector";

export default function SettingsScreen() {
  return (
    <View>
      <Text>Settings</Text>
      <FileSelector />
    </View>
  );
}
