import { useState, useEffect } from 'react';
import api from './api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  // Load tasks on page load
  useEffect(() => {
    api.get('/tasks').then(res => setTasks(res.data));
  }, []);

  // Add task
  const addTask = async (e) => {
    e.preventDefault();
    const { data } = await api.post('/tasks/addtask', { title });
    setTasks([data, ...tasks]);
    setTitle('');
  };

  // Complete task
  const completeTask = async (id) => {
    const { data } = await api.put(`/tasks/${id}/complete`);
    setTasks(tasks.map(t => t._id === data._id ? data : t));
  };

  // Delete task
  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    setTasks(tasks.filter(t => t._id !== id));
  };

  return (
    <div style={{ maxWidth: 500, margin: "20px auto", textAlign: "center" }}>
      <h1>Todo List</h1>
      <form onSubmit={addTask}>
        <input 
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Enter a task"
          required
        />
        <button type="submit">Add</button>
      </form>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map(task => (
          <li key={task._id} style={{ margin: "10px 0" }}>
            <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
              {task.title}
            </span>
            {!task.completed && (
              <button onClick={() => completeTask(task._id)}>Complete</button>
            )}
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
