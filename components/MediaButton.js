import { StyleSheet, Text, View, Pressable, Alert } from "react-native";

const MediaButton = (props) => {
  return (
    <View>
      <Pressable style={styles.pressBtn} onPressOut={props.pressOut}>
        <Text style={styles.text}>{props.text}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  pressBtn: {
    backgroundColor: "#ffa",
    margin: 2,
    borderWidth: 2,
    borderRadius: 20,
    padding: 10,
  },
  text: {
    fontWeight: "bold",
    color: "blue",
  },
});

export default MediaButton;
