import React, {useState} from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const Input = ({value, setValue, addTodo}) => {
  return (
    <View>
      <Text style={styles.label}>Enter your To-Dos</Text>
      <TextInput
        style={styles.input}
        placeholder="Add your todos"
        value={value}
        onChangeText={e => setValue(e)}
      />
      <TouchableOpacity style={styles.button} onPress={addTodo}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
    width: '80%',
    marginBottom: 16,
    borderRadius: 4,
    alignSelf: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
    color: 'blue',
    margin: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Input;
