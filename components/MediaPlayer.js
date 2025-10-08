import { StyleSheet, Text, View, Button, Pressable, Alert } from "react-native";
import { useState } from "react";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import Slider from "@react-native-community/slider";
import MediaButton from "./MediaButton";

const audioSources = [
  require("../assets/music/cats-and-mushrooms.mp3"),
  require("../assets/music/peaceful-lofi.mp3"),
  require("../assets/music/unstoppable-dance.mp3"),
];
const songNames = [
  "Fuzzy Cats and Mushrooms",
  "Peaceful Lofi",
  "Unstoppable Dance",
];

{
  /*
  ***Component Information***
  Licence/Royalty Free Music Source: https://pixabay.com/
  Audio sources should be provided by parent
  Song name should also come from parent.
  Media Player component displays track info and allows track control
  
*/
}
const MediaPlayer = () => {
  const [songPosition, setSongPosition] = useState(0);
  const player = useAudioPlayer(audioSources[songPosition]);
  const status = useAudioPlayerStatus(player).currentTime;
  const duration = player.duration;
  const timeDisplay =
    (duration / 60).toFixed(0) + ":" + (duration % 60).toFixed(0);

  const nextSong = () => {
    player.pause();
    setSongPosition(songPosition + 1);

    if (songPosition >= audioSources.length) {
      setSongPosition(0);
      player.replace(audioSources[songPosition]);
    } else {
      player.replace(audioSources[songPosition]);
    }
  };

  const prevSong = () => {
    player.pause();
    setSongPosition(songPosition - 1);
    if (songPosition <= 0) {
      setSongPosition(0);
      player.replace(audioSources[songPosition]);
    } else {
      player.replace(audioSources[songPosition]);
    }
  };

  return (
    <View style={styles.mediaPlayer}>
      <Text>Now Playing: {songNames[songPosition]}</Text>
      <Text>Song Length: {timeDisplay}</Text>
      <Text>Song number: {songPosition + 1}</Text>
      <View style={styles.buttonContainer}>
        <MediaButton text="Previous" pressOut={prevSong} />
        <MediaButton text="Play" pressOut={() => player.play()} />
        <MediaButton text="Pause" pressOut={() => player.pause()} />
        <MediaButton text="Next" pressOut={nextSong} />
      </View>
      <View style={styles.buttonContainer}>
        <MediaButton text="Restart" pressOut={() => player.seekTo(0)} />
        <MediaButton
          text="Press You!"
          pressOut={() => {
            Alert.alert("Don't Panic!");
          }}
        />
      </View>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Slider
          style={{ width: 300, height: 20, margin: 5 }}
          minimumValue={0}
          maximumValue={duration}
          step={1}
          value={status}
          onSlidingComplete={(value) => player.seekTo(value)}
          minimumTrackTintColor="#2e3299ff"
          maximumTrackTintColor="#000000"
        />
        <Text>
          {(status / 60).toFixed(0) +
            ":" +
            (status < 10 ? "0" : "") +
            (status % 60).toFixed(0)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mediaPlayer: {
    marginBottom: 5,
  },
  buttonContainer: {
    margin: 5,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  pressBtn: {
    backgroundColor: "#ffa",
    fontWeight: "heavy",
    margin: 5,
    borderWidth: 2,
    borderRadius: 20,
    padding: 10,
    height: "auto",
    width: "auto",
  },
});

export default MediaPlayer;
