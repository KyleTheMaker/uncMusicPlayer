/**
 * 
 * 
 * Button style for song control
 * used in Media Player
 * 
 * 
 */

import { StyleSheet, Text, View, Pressable, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const MediaButton = (props) => {
  return (
    <View>
      <Pressable style={styles.pressBtn} onPressOut={props.pressOut}>
        <Ionicons name={props.icon} size={props.size} color="#064e3b" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  pressBtn: {
    margin: 8,
    padding: 8,
    borderRadius: 40,

    backgroundColor: "#a7f3d0",
    shadowColor: "#0d9488",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
});

export default MediaButton;
