import React, { useState } from 'react';
import Widget from './Widget';

const TaskWidget = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask) {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  return (
    <Widget title="Task Manager">
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a task"
        className="border p-2 rounded"
      />
      <button onClick={addTask} className="bg-blue-500 text-white p-2 rounded mt-2">Add Task</button>
      <ul className="mt-4">
        {tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
    </Widget>
  );
};

export default TaskWidget;
