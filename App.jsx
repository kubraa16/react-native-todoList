import React, {useState} from 'react';
import Input from './src/components/Input';
import {View} from 'react-native';
import Todos from './src/components/Todos';
import CustomModal from './src/components/CustomModal';

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState('');
  const [tasks, setTasks] = useState([
    {id: 1, text: 'Doctor Appointment', completed: true},
    {id: 2, text: 'Meeting at School', completed: false},
  ]);
  const [id, setId] = useState('');
  function addTodo() {
    const newtask = {id: Date.now(), text: value, completed: false};
    setTasks([...tasks, newtask]);
    setValue('');
  }
  function deleteTodo() {
    const taskId = id;
    const updatedItem = tasks.filter(task => task.id !== taskId);
    setTasks(updatedItem);
    setModalVisible(false);
  }
  function deleteModal(taskId) {
    setModalVisible(true);
    setId(taskId);
  }
  function toggleComplete(taskId) {
    const updatedTask = tasks.map(task =>
      task.id === taskId ? {...task, completed: !task.completed} : task,
    );

    updatedTask.sort((a, b) => {
      if (a.completed && !b.completed) return 1;
      if (!a.completed && b.completed) return -1;
      return 0;
    });
    setTasks(updatedTask);
  }

  return (
    <View>
      <Input value={value} setValue={setValue} addTodo={addTodo} />
      <Todos
        tasks={tasks}
        setTasks={setTasks}
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
