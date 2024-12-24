import React, {useState} from 'react';
import {View, Text, Button, Modal, StyleSheet} from 'react-native';

const CustomModal = ({modalVisible, setModalVisible, deleteTodo}) => {
  return (
    <View style={styles.container}>
      <Button title="Open Modal" onPress={() => setModalVisible(true)} />

      <Modal
        animationType="slide" // 'slide' or 'fade'
        transparent={true} // makes the modal background transparent
        visible={modalVisible}
        onRequestClose={() => {
          // This is required on Android to handle the Back button
          setModalVisible(false);
        }}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Are you sure you want to delete this todo ?
            </Text>
            <View style={styles.buttonContainer}>
              <Button title="Close" onPress={() => setModalVisible(false)} />
              <Button title="Yes! delete" onPress={() => deleteTodo()} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent backdrop
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    padding: 24,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 16,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
  },
});
