/** uncMusicPlayer
 *
 *
 * The MediaPlayer Component handles song control and information
 * SongList lists all songs from the database
 * Playlist lists
 * Longpressing a song name opens the button intended for
 * adding or removing a song from a playlist/songlist
 *
 * TODO:
 * X - List all songs from songlist table into songlist component
 * X - list all songs from playlist table into playlist component
 *  - Songlist Longpress function inserts selected song into playlist table
 *  - Playlist Longpress function removes selected song from playlist table
 *
 *
 */

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";
import { useState } from "react";

import MediaPlayer from "./components/MediaPlayer";
import PlayList from "./components/PlayList";
import SongList from "./components/SongList";
import { manageDBIfNeeded } from "./data/musicdb";

export default function App() {

  /**
   * logic needed for adding selected song
   * 
  */
 const [playSong, setPlaySong] = useState('');

   function setSong(song) {
    setPlaySong(song);
  }

  return (
    <SafeAreaProvider>
      <SQLiteProvider databaseName="uncMusic.db" onInit={manageDBIfNeeded}>
        <SafeAreaView
          style={{ flex: 1, flexDirection: "column", overflow: "hidden" }}
        >
          <View style={styles.container}>
            <Header />
            <MediaPlayer />
          </View>
          <View
            style={{ flexDirection: "row", flex: 1, justifyContent: "center" }}
          >
            <PlayList playSong={setSong}/>
            <SongList playSong={setSong}/>
          </View>
          <StatusBar style="auto" />
        </SafeAreaView>
      </SQLiteProvider>
    </SafeAreaProvider>
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './screens/Home';
import PlaylistScreen from './screens/Playlist';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                    iconName = focused ? 'musical-notes' : 'musical-notes-outline';
                } else if (route.name === 'Playlist') {
                    iconName = focused ? 'albums' : 'albums-outline';
                }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'blue',
            tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Playlist" component={PlaylistScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}