/** uncMusicPlayer
 *
 * Play from our default songs, or ones stored on your device
 * Create your own playlist from your favourite songs
 * Select from multiple song control methods like:
 * - Buttons
 * - Screen Gestures
 *
 *
 */
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SongProvider } from "./context/SongContext";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";

import { manageDBIfNeeded } from "./data/musicdb";

import SettingsScreen from "./screens/SettingsScreen";
import HomeScreen from "./screens/HomeScreen";
import PlaylistScreen from "./screens/PlayListScreen";
import MediaPlayerScreen from "./screens/MediaPlayerScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <SQLiteProvider databaseName="uncMusic.db" onInit={manageDBIfNeeded}>
          <SongProvider>
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
                    return <Ionicons name={iconName} size={size} color={color} />;
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
          </SongProvider>
        </SQLiteProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
