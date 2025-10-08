/*
This component is for a selectable song item
the image is for add/remove selections
*/

import { useState } from "react";
import { Pressable, Text, Image, StyleSheet, View } from "react-native";

{
  /*
  ***Component Information***
Song should get its pressable text from parent list
parent list dictates if Long Press should be add or remove 

*/
}
const Song = (props) => {
  const [isSelected, setIsSelected] = useState("#ffa");
  const [isVisible, setVisible] = useState(false);
  return (
    <View>
      <Pressable
        style={styles.songItem}
        onLongPress={() => {
          setVisible(!isVisible);
        }}
        onPressIn={HandlePressIn}
      >
        {isVisible && (
          <Pressable style={styles.pressRemove}>
            <Text>{props.actionText}</Text>
          </Pressable>
        )}
        <Text>{props.song}</Text>
      </Pressable>
    </View>
  );
};

const HandlePressIn = () => {};

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
