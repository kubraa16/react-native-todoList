import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Input from './src/components/Input';
import Todos from './src/components/Todos';
import CustomModal from './src/components/CustomModal';
import { NavigationContainer } from '@react-navigation/native';

const STORAGE_KEY = '@my_tasks';

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState('');
  const [tasks, setTasks] = useState([]);
  const [id, setId] = useState(null);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedTasks !== null) {
          setTasks(JSON.parse(storedTasks));
        } else {
          setTasks([
            {id: 1, text: 'Doctor Appointment', status: 'todo'},
            {id: 2, text: 'Meeting at School', status: 'done'},
          ]);
        }
      } catch (error) {
        console.log('Error loading tasks from AsyncStorage:', error);
      }
    };
    loadTasks();
  }, []);

  useEffect(() => {
    const saveTasks = async () => {
      try {
        const jsonTasks = JSON.stringify(tasks);
        await AsyncStorage.setItem(STORAGE_KEY, jsonTasks);
      } catch (error) {
        console.log('Error saving tasks to AsyncStorage:', error);
      }
    };
    saveTasks();
  }, [tasks]);

  function addTodo() {
    if (!value.trim()) return;
    const newTask = {id: Date.now(), text: value, status: 'todo'};
    setTasks(prevTasks => [...prevTasks, newTask]);
    setValue('');
  }

  function deleteModal(taskId) {
    setModalVisible(true);
    setId(taskId);
  }

  function deleteTodo() {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    setModalVisible(false);
    setId(null);
  }

  function toggleComplete(taskId, newStatus) {
    const updatedTasks = tasks.map(task => {
      if (taskId === task.id) {
        return {...task, status: newStatus};
      }
      return task;
    });

    updatedTasks.sort((a, b) => {
      const statusOrder = {todo: 1, wip: 2, done: 3};
      return statusOrder[a.status] - statusOrder[b.status];
    });
    setTasks(updatedTasks);
  }


  return (
    <View>
      <Input value={value} setValue={setValue} addTodo={addTodo} />
      <NavigationContainer>
        
      </NavigationContainer>
      <Todos
        tasks={tasks}
        toggleComplete={toggleComplete}
        deleteModal={deleteModal}
      />
      <CustomModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        deleteTodo={deleteTodo}
      />
    </View>
  );
};

export default App;
