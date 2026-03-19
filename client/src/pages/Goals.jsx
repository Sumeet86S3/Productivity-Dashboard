import { useEffect, useState } from 'react';
import api from '../api/axios';

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [title, setTitle] = useState('');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');

  const loadGoals = async () => {
    try {
      const res = await api.get('/goals');
      setGoals(res.data);
    } catch (err) {
      console.error(err);
      setError('Could not load goals');
    }
  };

  useEffect(() => {
    loadGoals();
  }, []);

  const addGoal = async () => {
    if (!title.trim()) return;
    try {
      const res = await api.post('/goals', { title, progress: Number(progress) });
      setGoals((prev) => [res.data, ...prev]);
      setTitle('');
      setProgress(0);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Could not add goal');
    }
  };

  const updateProgress = async (goal, amount) => {
    try {
      const next = Math.min(100, Math.max(0, goal.progress + amount));
      const res = await api.put(`/goals/${goal._id}`, { progress: next });
      setGoals((prev) => prev.map((g) => (g._id === goal._id ? res.data : g)));
    } catch (err) {
      console.error(err);
      setError('Could not update goal');
    }
  };

  const deleteGoal = async (id) => {
    try {
      await api.delete(`/goals/${id}`);
      setGoals((prev) => prev.filter((g) => g._id !== id));
    } catch (err) {
      console.error(err);
      setError('Could not delete goal');
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4 rounded bg-white p-3 shadow-sm">
        <h3 className="font-bold mb-2">Add Goal</h3>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Goal title"
            className="w-full p-2 border border-slate-300 rounded"
          />
          <input
            type="number"
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            placeholder="Progress"
            className="w-full p-2 border border-slate-300 rounded"
            min={0}
            max={100}
          />
          <button onClick={addGoal} className="rounded bg-indigo-500 px-3 py-2 text-white">
            Add Goal
          </button>
        </div>
      </div>
      {error && <div className="mb-3 text-red-600">{error}</div>}
      <div className="space-y-2">
        {goals.map((goal) => (
          <div key={goal._id} className="bg-white rounded p-3 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-semibold">{goal.title}</p>
                <p className="text-xs text-slate-500">Progress: {goal.progress}%</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => updateProgress(goal, -10)} className="rounded bg-slate-200 px-2 py-1 text-xs">
                  -10
                </button>
                <button onClick={() => updateProgress(goal, 10)} className="rounded bg-indigo-500 px-2 py-1 text-xs text-white">
                  +10
                </button>
                <button onClick={() => deleteGoal(goal._id)} className="rounded bg-red-500 px-2 py-1 text-xs text-white">
                  Delete
                </button>
              </div>
            </div>
            <div className="mt-2 h-2 w-full rounded bg-slate-200">
              <div className="h-2 rounded bg-indigo-500" style={{ width: `${goal.progress}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Goals;
