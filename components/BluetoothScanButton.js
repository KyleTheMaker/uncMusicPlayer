import React from "react";
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function BluetoothScanButton({ scanning, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.btn, scanning && styles.btnDisabled]}
      onPress={onPress}
      disabled={scanning}
    >
      {scanning ? (
        <>
          <ActivityIndicator size="small" color="#064e3b" />
          <Text style={styles.text}>Scanning…</Text>
        </>
      ) : (
        <>
          <Ionicons name="bluetooth" size={20} color="#064e3b" />
          <Text style={styles.text}>Scan Devices</Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#a7f3d0",
    padding: 12,
    borderRadius: 12,
    gap: 8,
    marginTop: 15,

    shadowColor: "#0d9488",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },

  btnDisabled: {
    opacity: 0.6,
  },

  text: {
    color: "#064e3b", 
    fontSize: 16,
    fontWeight: "700",
  },
});
