# **UncMusicPlayer**

This music player offers track control through buttons, gestures, camera input, and BT Mouse input.

## Components
1. Song  
A pressable item with a longpress function that opens a customizable button. the main onPress function is intended to play selected song.

2. MediaButton  
A pressable button with customizable text and function. intended for song controls(Play, Pause, Next, etc.).

3. MediaPlayer  
A Component for controlling and displaying the current song, and navigating the current playlist.

4. Playlist  
A customizable list of songs chosen by the user.

5. Songlist  
A list of all songs in the app

## Resources:

**Create project:**  
npx create-expo-app@latest --template blank  
npx expo start --tunnel (for lab computers since they use diff network)  
npx expo start (for home use)

**Expo Web Package install:**  
npx expo install react-dom react-native-web @expo/metro-runtime

**Safe Area context for mobile screens:**  
https://appandflow.github.io/react-native-safe-area-context/

**Expo Audio:**  
https://docs.expo.dev/versions/latest/sdk/audio/

**React Community Slider (Song Tracking):**  
https://github.com/callstack/react-native-slider#installation--usage

**Expo SQLite (song and playlist storage):**  
https://docs.expo.dev/versions/latest/sdk/sqlite/  
https://github.com/OmonUrkinbaev/SQLiteExampleApp/tree/master
https://docs.expo.dev/versions/latest/sdk/sqlite/

**Expo Vector Icons:**  
https://docs.expo.dev/guides/icons/

**Tabs Navigator**  
https://reactnavigation.org/docs/bottom-tab-navigator/?config=dynamic

