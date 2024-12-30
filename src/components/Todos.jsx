import CheckBox from '@react-native-community/checkbox';
import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Picker} from '@react-native-picker/picker';

const Todos = ({tasks, setTasks, deleteModal, toggleComplete}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.taskItem}>
            <Picker
              selectedValue={item.status}
              onValueChange={newValue => {
                console.log('Picker changed to:', newValue);
                toggleComplete(item.id, newValue);
              }}
              style={{width: 120, marginRight: 10}}>
              <Picker.Item
                key="todo"
                style={{color: 'red'}}
                label="To Do"
                value="todo"
              />
              <Picker.Item
                key="wip"
                style={{color: '#dbd330'}}
                label="WIP"
                value="wip"
              />
              <Picker.Item
                key="done"
                style={{color: 'green'}}
                label="Done"
                value="done"
              />
            </Picker>
            <Text style={[styles.taskText, styles[item.status]]}>
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
  done: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
});

export default Todos;
