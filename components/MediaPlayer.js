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
import {
  StyleSheet,
  Text,
  View,
  Button,
  Pressable,
  Alert,
  Image,
} from "react-native";
import { useState, useEffect } from "react";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import Slider from "@react-native-community/slider";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

import MediaButton from "./MediaButton";
import { SongContext, useSongPlayer } from "../context/SongContext";

const MediaPlayer = () => {
  const { currentSong, changeTrack, isLoading } = useSongPlayer();

  const [songPosition, setSongPosition] = useState(0);
  const player = useAudioPlayer(isLoading ? null : currentSong.location);
  const [isPlay, setIsPlay] = useState(true);
  const [currentTime, setCurrentTime] = useState("");
  const [formattedSongDuration, setFormattedSongDuration] = useState("0:00");
  const status = useAudioPlayerStatus(player)?.currentTime || 0;
  const duration = player?.duration || 0;
  const coverImages = [
    require("../assets/vinyl-record.gif"),
    require("../assets/vinyl-record-static.png"),
  ];
  const [currentImage, setCurrentImage] = useState(coverImages[0]);
  const MAX_TRANSLATION_Y = 300;

  // update current time
  useEffect(() => {
    setCurrentTime(formatTime(status));
  }, [status]);

  // update song duration
  useEffect(() => {
    if (duration == 0) return;
    else setFormattedSongDuration(formatTime(duration));
  }, [duration]);

  // play on song change
  useEffect(() => {
    if (!isLoading && currentSong.location && player.isLoaded) {
      player.play();
      setIsPlay(true);
    }
  }, [currentSong.location, player.isLoaded, isLoading]);

  // change image when isPlay variable changed
  useEffect(() => {
    if (isPlay) {
      setCurrentImage(coverImages[0]);
    } else {
      setCurrentImage(coverImages[1]);
    }
  }, [isPlay]);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  const timeDisplay = formatTime(duration);
  const statusDisplay = formatTime(status);

  if (isLoading) {
    return (
      <View style={styles.mediaPlayer}>
        <Text>Loading music from database...</Text>
      </View>
    );
  }

  const handlePlayButton = () => {
    if (isPlay) {
      player.pause();
    } else {
      player.play();
    }

    setIsPlay((prevVal) => !prevVal);
  };

  useEffect(() => {
    if (!isLoading && currentSong.location && player.isLoaded) {
      player.play();
    }
  }, [currentSong.location, player.isLoaded, isLoading]);

  useEffect(() => {
    console.log(`volume:${player.volume}`);
  }, [player.volume]);

  const panGesture = Gesture.Pan().onEnd((e) => {
    const { translationX, translationY } = e;

    if (Math.abs(translationX) > Math.abs(translationY)) {
      // Horizontal swipe
      if (translationX > 50) {
        console.log("Swiped right");
      } else if (translationX < -50) {
        console.log("Swiped left");
      }
      console.log(translationX);
    } else {
      // Vertical swipe
      let normalizedY = Math.min(Math.abs(translationY) / MAX_TRANSLATION_Y, 1); // normalized value between 0-1

      if (translationY > 20) {
        // swiped down, decrease volume
        normalizedY *= -1;
        console.log("swiped down");
      } else if (translationY < 20) {
        // swiped up, increase volume
        console.log("swiped up");
      }

      let newVolume = player.volume + normalizedY;

      if (newVolume >= 1) newVolume = 1;
      else if (newVolume <= 0) newVolume = 0.0;

      player.volume = newVolume;
    }
  });

  return (
    <GestureDetector gesture={panGesture}>
      <View style={styles.mediaPlayer}>
        <View style={styles.imageContainer}>
          <Image style={styles.coverImage} source={currentImage} />
        </View>

        <View style={styles.musicBarContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Text>{currentTime}</Text>
            <Text>{formattedSongDuration}</Text>
          </View>
          <Slider
            style={{ width: "100%", margin: 5 }}
            minimumValue={0}
            maximumValue={duration}
            step={1}
            value={status}
            onSlidingComplete={(value) => player.seekTo(value)}
            minimumTrackTintColor="#2e3299ff"
            maximumTrackTintColor="#000000"
          />
          <Text style={{ fontSize: 30, textAlign: "center", margin: 5 }}>
            {currentSong.name}
          </Text>
          {/* <Text style={{fontSize: 14, textAlign: 'center', margin: 5}}>Track #{currentSong.name}</Text> */}
        </View>

        <View style={styles.buttonContainer}>
          <View style={styles.buttonRowContainer}>
            <MediaButton
              icon="play-skip-back"
              size={60}
              pressOut={() => changeTrack(-1)}
            />
            <MediaButton
              icon={isPlay ? "pause-circle" : "play-circle"}
              size={90}
              pressOut={handlePlayButton}
            />
            <MediaButton
              icon="play-skip-forward"
              size={60}
              pressOut={() => changeTrack(1)}
            />
          </View>
        </View>
      </View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  mediaPlayer: {
    flex: 1,
    padding: 8,
  },
  imageContainer: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  coverImage: {
    width: 350,
    height: 350,
    resizeMode: "cover",
  },
  musicBarContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
  },
  buttonRowContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MediaPlayer;
