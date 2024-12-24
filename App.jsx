import React, {useState} from 'react';
import Input from './src/components/Input';
import {View} from 'react-native';
import Todos from './src/components/Todos';

const App = () => {
  const [value, setValue] = useState('');
  const [tasks, setTasks] = useState([
    {id: 1, text: 'Doctor Appointment', completed: true},
    {id: 2, text: 'Meeting at School', completed: false},
  ]);
  function addTodo() {
    const newtask = {id: Date.now(), text: value, completed: false};
    setTasks([...tasks, newtask]);
    setValue('');
  }
  function deleteTodo(taskId) {
    const updatedItem = tasks.filter(task => task.id !== taskId);
    setTasks(updatedItem);
  }
  function toggleComplete(taskId) {
    console.log(taskId);
    console.log('Before toggle:', tasks);
    const updatedTask = tasks.map(task =>
      task.id === taskId ? {...task, completed: !task.completed} : task,
    );
    console.log('After toggle:', updatedTask);
    setTasks(updatedTask);
  }

  return (
    <View>
      <Input value={value} setValue={setValue} addTodo={addTodo} />
      <Todos
        tasks={tasks}
        setTasks={setTasks}
        deleteTodo={deleteTodo}
        toggleComplete={toggleComplete}
      />
    </View>
  );
};

export default App;
