/** uncMusicPlayer
 *
 *
 * The MediaPlayer Component handles song control and information
 * SongList lists all songs from the database
 * Playlist lists
 * Longpressing a song name opens the button intended for
 * adding or removing a song from a playlist/songlist
 * NavigationContainer is wrapped in SongContext, this allows
 * all screens to have access to the current song by importing
 * useContext and referencing SongContext
 *
 * TODO:
 * X - List all songs from songlist table into songlist component
 * X - list all songs from playlist table into playlist component
 *  - Songlist Longpress function inserts selected song into playlist table
 *  - Playlist Longpress function removes selected song from playlist table
 *
 *
 */
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { SongProvider } from "./context/SongContext";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { manageDBIfNeeded } from "./data/musicdb";

import SettingsScreen from "./screens/SettingsScreen";
import HomeScreen from "./screens/HomeScreen";
import PlaylistScreen from "./screens/PlayListScreen";
import MediaPlayerScreen from "./screens/MediaPlayerScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <SQLiteProvider databaseName="uncMusic.db" onInit={manageDBIfNeeded}>
        <SongProvider>
          <GestureHandlerRootView>
            <NavigationContainer>
              <Tab.Navigator
                screenOptions={({ route }) => ({
                  tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === "Home") {
                      iconName = focused ? "home" : "home-outline";
                    } else if (route.name === "Playlist") {
                      iconName = focused ? "albums" : "albums-outline";
                    } else if (route.name === "Music Player") {
                      iconName = focused
                        ? "musical-notes"
                        : "musical-notes-outline";
                    } else if (route.name === "Settings") {
                      iconName = focused ? "settings" : "settings-outline";
                    }

                    // You can return any component that you like here!
                    return (
                      <Ionicons name={iconName} size={size} color={color} />
                    );
                  },
                  tabBarActiveTintColor: "blue",
                  tabBarInactiveTintColor: "gray",
                })}
              >
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Playlist" component={PlaylistScreen} />
                <Tab.Screen name="Music Player" component={MediaPlayerScreen} />
                <Tab.Screen name="Settings" component={SettingsScreen} />
              </Tab.Navigator>
            </NavigationContainer>
          </GestureHandlerRootView>
        </SongProvider>
      </SQLiteProvider>
    </SafeAreaProvider>
  );
}
