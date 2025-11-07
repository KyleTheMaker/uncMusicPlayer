/**
 *
 * This is for managing interactions with the db
 *
 *
 */

export const AudioAssetMap = {
  "./assets/music/afrobeat-chill.mp3": require("../assets/music/afrobeat-chill.mp3"),
  "./assets/music/cats-and-mushrooms.mp3": require("../assets/music/cats-and-mushrooms.mp3"),
  "./assets/music/chill-lofi.mp3": require("../assets/music/chill-lofi.mp3"),
  "./assets/music/chill-lounge-lofi.mp3": require("../assets/music/chill-lounge-lofi.mp3"),
  "./assets/music/chillhop-in-new-york.mp3": require("../assets/music/chillhop-in-new-york.mp3"),
  "./assets/music/chillhop-lofi.mp3": require("../assets/music/chillhop-lofi.mp3"),
  "./assets/music/japanese-magic-lofi.mp3": require("../assets/music/japanese-magic-lofi.mp3"),
  "./assets/music/jazzy-lofi-rhythm.mp3": require("../assets/music/jazzy-lofi-rhythm.mp3"),
  "./assets/music/peaceful-lofi.mp3": require("../assets/music/peaceful-lofi.mp3"),
  "./assets/music/unstoppable-dance.mp3": require("../assets/music/unstoppable-dance.mp3"),
};

export async function manageDBIfNeeded(db) {
  const DATABASE_VERSION = 1;

  let result = await db.getFirstAsync("PRAGMA user_version");
  let currentDbVersion = result ? result.user_version : 0;

  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }
  if (currentDbVersion === 0) {
    await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS songlist (id INTEGER PRIMARY KEY NOT null, name TEXT UNIQUE NOT null, location TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS playlist (id INTEGER PRIMARY KEY NOT null, name TEXT UNIQUE NOT null, location TEXT NOT NULL);
    INSERT OR IGNORE INTO playlist (name, location) VALUES ("Fuzzy Cats and Mushrooms", "./assets/music/cats-and-mushrooms.mp3");
    INSERT OR IGNORE INTO playlist (name, location) VALUES ("Peaceful Lofi", "./assets/music/peaceful-lofi.mp3");
    INSERT OR IGNORE INTO playlist (name, location) VALUES ("Unstoppable Dance", "./assets/music/unstoppable-dance.mp3");
    INSERT OR IGNORE INTO songlist (name, location) VALUES ("Fuzzy Cats and Mushrooms", "./assets/music/cats-and-mushrooms.mp3");
    INSERT OR IGNORE INTO songlist (name, location) VALUES ("Peaceful Lofi", "./assets/music/peaceful-lofi.mp3");
    INSERT OR IGNORE INTO songlist (name, location) VALUES ("Unstoppable Dance", "./assets/music/unstoppable-dance.mp3");
    INSERT OR IGNORE INTO songlist (name, location) VALUES ("afrobeat-chill", "./assets/music/afrobeat-chill.mp3");
    INSERT OR IGNORE INTO songlist (name, location) VALUES ("chill-lofi", "./assets/music/chill-lofi.mp3");
    INSERT OR IGNORE INTO songlist (name, location) VALUES ("chill-lounge-lofi", "./assets/music/chill-lounge-lofi.mp3");
    INSERT OR IGNORE INTO songlist (name, location) VALUES ("chillhop-in-new-york", "./assets/music/chillhop-in-new-york.mp3");
    INSERT OR IGNORE INTO songlist (name, location) VALUES ("chillhop-lofi", "./assets/music/chillhop-lofi.mp3");
    INSERT OR IGNORE INTO songlist (name, location) VALUES ("japanese-magic-lofi", "./assets/music/japanese-magic-lofi.mp3");
    INSERT OR IGNORE INTO songlist (name, location) VALUES ("jazzy-lofi-rhythm", "./assets/music/jazzy-lofi-rhythm.mp3");
    `);
    currentDbVersion = 1;
  }
  // if (currentDbVersion === 1) {
  //   Add more migrations
  // }
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}

export async function getPlayListSongs(db) {
  try {
    const playListSongs = await db.getAllAsync("SELECT * FROM playlist");
    return playListSongs;
  } catch (error) {
    console.error("Failed to fetch songs:", error);
    return [];
  }
}

export async function getSongListSongs(db) {
  try {
    const allSongs = await db.getAllAsync("SELECT * FROM songlist");
    return allSongs;
  } catch (error) {
    console.error("Failed to fetch songs:", error);
    return [];
  }
}

export async function addSongToPlaylist(db, name, location) {
    try {
        // Use db.runAsync for INSERT, UPDATE, DELETE queries
        await db.runAsync(
            "INSERT OR IGNORE INTO playlist (name, location) VALUES (?, ?)", 
            [name, location]
        );
        console.log(`Added song: ${name}`);
    } catch (error) {
        console.error("Error adding song to playlist:", error);
    }
}

export async function removeSongFromPlaylist(db, name) {
    try {
        // Use db.runAsync for INSERT, UPDATE, DELETE queries
        await db.runAsync(
            "DELETE FROM playlist WHERE name = ? ", 
            [name]
        );
        console.log(`Removed song: ${name}`);
    } catch (error) {
        console.error("Error adding song to playlist:", error);
    }
}
