/* eslint-disable react/no-unstable-nested-components */
import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Input from './src/components/Input';
import Todos from './src/components/Todos';
import CustomModal from './src/components/CustomModal';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
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
    setTasks(prevTasks => [newTask, ...prevTasks]);
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

  const tabs = {
    all: {label: 'All', icon: {focused: 'list', default: 'list-outline'}},
    todo: {
      label: 'Todo',
      icon: {focused: 'checkmark', default: 'checkmark-outline'},
    },
    wip: {label: 'Wip', icon: {focused: 'hammer', default: 'hammer-outline'}},
    done: {
      label: 'Done',
      icon: {focused: 'checkmark-done', default: 'checkmark-done-outline'},
    },
  };

  return (
    <>
      <View style={{flex: 1}}>
        <Input value={value} setValue={setValue} addTodo={addTodo} />
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="All"
            screenOptions={({route}) => ({
              tabBarIcon: ({focused, color, size}) => {
                const tabKey = Object.keys(tabs).find(
                  key => tabs[key].label === route.name,
                );
                if (!tabKey) {
                  return (
                    <Ionicons name="help-circle" size={size} color={color} />
                  );
                }
                const iconName = focused
                  ? tabs[tabKey].icon.focused
                  : tabs[tabKey].icon.default;
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: 'blue',
              tabBarInactiveTintColor: 'gray',
              headerShown: false,
            })}>
            {Object.keys(tabs).map(tab => (
              <Tab.Screen
                key={tab}
                name={tabs[tab].label}
                options={{headerShown: false}}>
                {() => (
                  <Todos
                    tasks={
                      tab === 'all'
                        ? tasks
                        : tasks.filter(task => task.status === tab)
                    }
                    toggleComplete={toggleComplete}
                    deleteModal={deleteModal}
                  />
                )}
              </Tab.Screen>
            ))}
          </Tab.Navigator>
        </NavigationContainer>
      </View>
      {modalVisible && (
        <CustomModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          deleteTodo={deleteTodo}
        />
      )}
    </>
  );
};

export default App;
