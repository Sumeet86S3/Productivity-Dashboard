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
    <div className="space-y-4">
      <div className="rounded-2xl border border-white/10 bg-white/10 p-4 shadow-xl backdrop-blur-lg">
        <h2 className="mb-2 text-2xl font-extrabold text-white">Tasks</h2>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
          <input
            className="grow rounded-lg border border-white/20 bg-slate-900/60 px-3 py-2 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            placeholder="New task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            onClick={addTask}
            className="rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-500 px-4 py-2 font-semibold text-white shadow-lg transition hover:scale-[1.01] hover:shadow-xl"
          >
            Add Task
          </button>
        </div>
      </div>
      {error && <div className="rounded-lg border border-red-400 bg-red-500/20 p-2 text-red-100">{error}</div>}
      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task._id}
            className={`flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/10 p-4 text-white shadow-lg backdrop-blur-lg ${
              task.completed ? 'opacity-80' : 'opacity-100'
            }`}
          >
            <p className={`text-lg ${task.completed ? 'line-through text-slate-300' : 'text-white'}`}>
              {task.title}
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => toggleTask(task)}
                className="rounded-lg border border-white/20 bg-slate-700/70 px-3 py-1 text-sm text-white transition hover:bg-slate-600"
              >
                {task.completed ? 'Undo' : 'Complete'}
              </button>
              <button
                onClick={() => deleteTask(task._id)}
                className="rounded-lg bg-red-500 px-3 py-1 text-sm text-white transition hover:bg-red-600"
              >
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
