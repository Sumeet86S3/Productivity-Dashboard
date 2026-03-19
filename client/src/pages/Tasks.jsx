import { useEffect, useState } from 'react';
import api from '../api/axios';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const loadTasks = async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error(err);
      setError('Could not load tasks.');
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = async () => {
    if (!title.trim()) return;
    try {
      const res = await api.post('/tasks', { title });
      setTasks((prev) => [res.data, ...prev]);
      setTitle('');
      setError('');
    } catch (err) {
      setError('Could not add task');
      console.error(err);
    }
  };

  const toggleTask = async (task) => {
    try {
      const res = await api.put(`/tasks/${task._id}`, { completed: !task.completed });
      setTasks((prev) => prev.map((t) => (t._id === task._id ? res.data : t)));
    } catch (err) {
      console.error(err);
      setError('Could not update task');
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
      setError('Could not delete task');
    }
  };

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row sm:items-end gap-2 mb-4">
        <div className="grow">
          <input
            className="w-full p-2 rounded border border-slate-300"
            placeholder="New task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <button onClick={addTask} className="px-3 py-2 rounded bg-indigo-500 text-white hover:bg-indigo-600">
          Add Task
        </button>
      </div>
      {error && <div className="mb-3 text-red-600">{error}</div>}
      <div className="space-y-2">
        {tasks.map((task) => (
          <div key={task._id} className="flex items-center justify-between bg-white rounded p-3 shadow-sm">
            <div>
              <p className={`font-medium ${task.completed ? 'line-through text-slate-400' : ''}`}>{task.title}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleTask(task)}
                className="rounded bg-slate-200 px-2 py-1 text-sm"
              >
                {task.completed ? 'Undo' : 'Complete'}
              </button>
              <button onClick={() => deleteTask(task._id)} className="rounded bg-red-500 px-2 py-1 text-sm text-white">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
