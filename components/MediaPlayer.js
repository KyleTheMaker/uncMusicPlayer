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
import { StyleSheet, Text, View, Button, Pressable, Alert, Image } from "react-native";
import { useState, useEffect } from "react";
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

const MediaPlayer = () => {
  const [songPosition, setSongPosition] = useState(0);
  const [isPlay, setIsPlay] = useState(true);
  const [currentTime, setCurrentTime] = useState("");
  const [formattedSongDuration, setFormattedSongDuration] = useState("0:00");
  const player = useAudioPlayer(audioSources[songPosition]);
  const status = useAudioPlayerStatus(player).currentTime;
  const duration = player.duration;
  const coverImages = [
    require('../assets/vinyl-record.gif'),
    require('../assets/vinyl-record-static.png'),
  ];
  const [currentImage, setCurrentImage] = useState(coverImages[0]);

  // update current time
  useEffect(() => {
    setCurrentTime(formatTime(status))
  }, [status])

  // update song duration
  useEffect(() => {
    if(duration == 0) return
    else setFormattedSongDuration(formatTime(duration))
  }, [duration])

  // play when song changed
  useEffect(() => {
    player.replace(audioSources[songPosition])
    player.play()
    setIsPlay(true)
  }, [songPosition])

  // change image when isPlay variable changed
  useEffect(() => {
    if(isPlay){
      setCurrentImage(coverImages[0])
    }
    else{
      setCurrentImage(coverImages[1])
    }
  }, [isPlay])

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60)
    const secs = totalSeconds % 60
    const formattedSecs = secs < 10 ? `0${secs.toFixed(0)}` : secs.toFixed(0)
    return `${mins}:${formattedSecs}`
  }

  const nextSong = () => {
    if(songPosition + 1 >= audioSources.length){
      setSongPosition(0)
    }
    else{
      setSongPosition((prevVal) => prevVal + 1);  
    }
  };

  const prevSong = () => {
    if(songPosition - 1 < 0){
      setSongPosition(audioSources.length - 1)
    }
    else{
      setSongPosition((prevVal) => prevVal - 1);  
    }
  };

  const handlePlayButton = () => {
    if(isPlay){
      player.pause()
    }
    else{
      player.play()
    }

    setIsPlay((prevVal) => !prevVal)
  }

  return (
    <View style={styles.mediaPlayer}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.coverImage}
          source={currentImage}
        />
      </View>

      <View style={styles.musicBarContainer}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", width: '100%', }}>
          <Text>{currentTime}</Text>
          <Text>{formattedSongDuration}</Text>
        </View>
        <Slider
          style={{ width: '100%', margin: 5 }}
          minimumValue={0}
          maximumValue={duration}
          step={1}
          value={status}
          onSlidingComplete={(value) => player.seekTo(value)}
          minimumTrackTintColor="#2e3299ff"
          maximumTrackTintColor="#000000"
        />
        <Text style={{fontSize: 30, textAlign: 'center', margin: 5}}>{songNames[songPosition]}</Text>
        <Text style={{fontSize: 14, textAlign: 'center', margin: 5}}>Track #{songPosition + 1}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonRowContainer}>
          <MediaButton icon="play-skip-back" size={60} pressOut={prevSong} />
          <MediaButton icon={isPlay ? "pause-circle" : "play-circle"} size={90} pressOut={handlePlayButton}/>
          <MediaButton icon="play-skip-forward" size={60} pressOut={nextSong} />
          {/*<MediaButton icon="play-circle" size={90} pressOut={() => player.seekTo(0)} />
          <MediaButton
            text="Press You!"
            pressOut={() => {
              Alert.alert("Don't Panic!");
            }}
          />*/}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mediaPlayer: {
    flex: 1,
    padding: 8,
  },
  imageContainer: {
    flex:3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverImage: {
    width: 350,
    height: 350,
    resizeMode: 'cover',
  },
  musicBarContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonRowContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MediaPlayer;
