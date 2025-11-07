import { StyleSheet, Text, View, Pressable, Modal} from "react-native";

const HelpModal = (props) => {
  return(
    <Modal
      transparent
      visible={props.showHelp}
      animationType="fade"
      onRequestClose={() => props.closeHelp(false)}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Advanced Mode</Text>
          <Text style={styles.modalText}><Text style={{fontWeight:'bold'}}>Volume Control</Text>: Swipe up or down</Text>
          <Text style={styles.modalText}><Text style={{fontWeight:'bold'}}>Track Control</Text>: Swipe left or right</Text>
          <Text style={styles.modalText}><Text style={{fontWeight:'bold'}}>Rewind Song</Text>: Long press</Text>
          <Text style={styles.modalText}><Text style={{fontWeight:'bold'}}>Play or Pause</Text>: Single tap</Text>
          <Text style={styles.modalText}><Text style={{fontWeight:'bold'}}>Go to Playlist</Text>: Pinch out (zoom in)</Text>
          <Pressable onPress={() => props.closeHelp(false)} style={styles.closeButton}>
            <Text style={styles.buttonText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: '#d9534f',
    padding: 10,
    borderRadius: 6,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 250,
  },
  modalText: {
    fontSize: 14,
    textAlign: 'center',
  },
  modalTitle: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 8,
  },
})

export default HelpModal