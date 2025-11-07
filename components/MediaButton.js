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
        <Ionicons name={props.icon} size={props.size} color="blue" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  pressBtn: {
    margin: 8,
  },
  text: {
    fontWeight: "bold",
    color: "blue",
  },
});

export default MediaButton;
