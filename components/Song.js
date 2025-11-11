/**
 *
 *
 * ***Component Information***
 * This component is for a selectable song item
 * Song should get its pressable text from parent list
 * parent list dictates if Long Press should be add or remove
 * Currently action pressable has actionSelectedSong as pressOut function
 * Main song Pressable uses playSelectedSong function for onPressOut
 *
 *
 */

import { useState } from "react";
import { Pressable, Text, Image, StyleSheet, View, Alert } from "react-native";

const Song = (props) => {
  const [isVisible, setVisible] = useState(false);
  return (
    <View>
      <Pressable
        style={styles.songItem}
        onLongPress={() => {
          setVisible(!isVisible);
        }}
        onPressOut={() => {
          props.playSong(props.songLocation, props.songName);
        }}
      >
        {isVisible && (
          <Pressable
            style={styles.pressRemove}
            onPressOut={() => {
              props.actionFunction(props.songName, props.songLocation);
              Alert.alert(props.actionText+" "+props.songName);
            }}
          >
            <Text>{props.actionText}</Text>
          </Pressable>
        )}
        <Text>{props.songName}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  songItem: {
    backgroundColor: "#ffa",
    padding: 2,
    marginBlock: 5,
    borderWidth: 1,
    borderColor: "lightblue",
    borderRadius: 10,
    flexDirection: "row",
  },
  addRemove: {
    marginEnd: 2,
    backgroundColor: "#00a",
  },
  pressRemove: {
    borderWidth: 2,
    borderColor: "red",
    borderRadius: 8,
    backgroundColor: "orange",
  },
});
export default Song;
