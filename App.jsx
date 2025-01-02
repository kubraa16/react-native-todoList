/* eslint-disable react/no-unstable-nested-components */
import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Input from './src/components/Input';
import Todos from './src/components/Todos';
import CustomModal from './src/components/CustomModal';

import {TABS, TAB_KEY, TASK_STATUS} from './src/constanats/constants';

const Tab = createBottomTabNavigator();
const STORAGE_KEY = '@my_tasks';

function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState('');
  const [tasks, setTasks] = useState([]);
  const [id, setId] = useState(null);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        } else {
          setTasks([
            {id: 1, text: 'Doctor Appointment', status: TASK_STATUS.TODO},
            {id: 2, text: 'Meeting at School', status: TASK_STATUS.DONE},
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
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
      } catch (error) {
        console.log('Error saving tasks to AsyncStorage:', error);
      }
    };
    saveTasks();
  }, [tasks]);

  function addTodo() {
    if (!value.trim()) return;
    const newTask = {
      id: Date.now(),
      text: value,
      status: TASK_STATUS.TODO,
    };
    setTasks(prevTasks => [newTask, ...prevTasks]);
    setValue('');
  }

  function deleteModal(taskId) {
    setModalVisible(true);
    setId(taskId);
  }

  function deleteTodo() {
    if (id === null) return;
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    setModalVisible(false);
    setId(null);
  }

  function toggleComplete(taskId, newStatus) {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return {...task, status: newStatus};
      }
      return task;
    });

    const statusOrder = {
      [TASK_STATUS.TODO]: 1,
      [TASK_STATUS.WIP]: 2,
      [TASK_STATUS.DONE]: 3,
    };

    updatedTasks.sort((a, b) => {
      return statusOrder[a.status] - statusOrder[b.status];
    });

    setTasks(updatedTasks);
  }

  return (
    <View style={{flex: 1, position: 'relative'}}>
      <Input value={value} setValue={setValue} addTodo={addTodo} />

      <NavigationContainer>
        <Tab.Navigator
          initialRouteName={TABS[TAB_KEY.ALL].label}
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              const foundKey = Object.values(TAB_KEY).find(
                key => TABS[key].label === route.name,
              );

              if (!foundKey) {
                return (
                  <Ionicons name="help-circle" size={size} color={color} />
                );
              }

              const iconName = focused
                ? TABS[foundKey].icon.focused
                : TABS[foundKey].icon.default;

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'blue',
            tabBarInactiveTintColor: 'gray',
            headerShown: false,
          })}>
          {Object.values(TAB_KEY).map(key => (
            <Tab.Screen
              key={key}
              name={TABS[key].label}
              options={{headerShown: false}}>
              {() => (
                <Todos
                  tasks={
                    key === TAB_KEY.ALL
                      ? tasks
                      : tasks.filter(task => task.status === key)
                  }
                  toggleComplete={toggleComplete}
                  deleteModal={deleteModal}
                />
              )}
            </Tab.Screen>
          ))}
        </Tab.Navigator>
      </NavigationContainer>

      {modalVisible && (
        <CustomModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          deleteTodo={deleteTodo}
        />
      )}
    </View>
  );
}

export default App;
