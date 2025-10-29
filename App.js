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
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import SettingsScreen from './screens/SettingsScreen';
import HomeScreen from './screens/Home';
import PlaylistScreen from './screens/PlayListScreen';
import MediaPlayerScreen from './screens/MediaPlayerScreen';

import { PlayListProvider } from './context/PlayListContext';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <PlayListProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                  let iconName;

                  if (route.name === 'Home') {
                      iconName = focused ? 'home' : 'home-outline';
                  } else if (route.name === 'Playlist') {
                      iconName = focused ? 'albums' : 'albums-outline';
                  } else if (route.name === 'Music Player') {
                    iconName = focused ? 'musical-notes' : 'musical-notes-outline';
                  } else if (route.name === 'Settings') {
                    iconName = focused ? 'settings' : 'settings-outline';
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
          <Tab.Screen name="Music Player" component={MediaPlayerScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </PlayListProvider>
  );
}