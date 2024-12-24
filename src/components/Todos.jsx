import CheckBox from '@react-native-community/checkbox';
import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Todos = ({tasks, setTasks, deleteModal, toggleComplete}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.taskItem}>
            <TouchableOpacity onPress={() => toggleComplete(item.id)}>
              <Text>{item.completed ? '✔' : '✗'}</Text>
            </TouchableOpacity>
            <Text
              style={[styles.taskText, item.completed && styles.completedTask]}>
              {item.text}
            </Text>
            <TouchableOpacity onPress={() => deleteModal(item.id)}>
              <Icon name="trash" size={24} color="black" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  lable: {
    fontSize: 18,
    fontWeight: 500,
    color: 'blue',
    margin: 10,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    marginBottom: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    elevation: 1,
  },
  taskText: {
    fontSize: 16,
    color: '#333',
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
});

export default Todos;
