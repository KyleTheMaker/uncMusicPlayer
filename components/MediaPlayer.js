/**
 * ***Component Information***
 * Licence/Royalty Free Music Source: https://pixabay.com/
 * Media Player component displays track info and allows track control
 * Tracks are currently hardcoded into the media player
 * ideally tracks come from database
 * 
 * TODO:
 *  - Audio sources should be provided by parent (database?)
 *  - Song name should also come from parent (database?)
 * 
 * 
 * 
 */
import { StyleSheet, Text, View, Button, Pressable, Alert } from "react-native";
import { useEffect, useState } from "react";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import Slider from "@react-native-community/slider";
import MediaButton from "./MediaButton";
import { SongContext, useSongPlayer } from "../context/SongContext";

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



const MediaPlayer = () => {

  const {currentSong, changeTrack} = useSongPlayer();

  const [songPosition, setSongPosition] = useState(0);
  const player = useAudioPlayer(currentSong.location);
  const status = useAudioPlayerStatus(player).currentTime;
  const duration = player.duration;
  const timeDisplay =
    (duration / 60).toFixed(0) + ":" + (duration % 60).toFixed(0);
    
    useEffect(() => {
      if(currentSong && player.isLoaded){
        player.play();
      }
    }, [currentSong.location, player.isLoaded]);


  return (
    <View style={styles.mediaPlayer}>
      <Text>Now Playing: {currentSong.name}</Text>
      <Text>Song Length: {timeDisplay}</Text>
      <View style={styles.buttonContainer}>
        <MediaButton text="Previous" pressOut={() => changeTrack(-1)} />
        <MediaButton text="Play" pressOut={() => player.play()} />
        <MediaButton text="Pause" pressOut={() => player.pause()} />
        <MediaButton text="Next" pressOut={() => changeTrack(1)} />
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
