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
    <div className="space-y-4">
      <div className="rounded-2xl border border-white/10 bg-white/10 p-4 shadow-xl backdrop-blur-lg">
        <h2 className="mb-2 text-2xl font-extrabold text-white">Goals</h2>
        <div className="grid gap-2 md:grid-cols-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Goal title"
            className="w-full rounded-lg border border-white/20 bg-slate-900/60 px-3 py-2 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <input
            type="number"
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            placeholder="Progress"
            className="w-full rounded-lg border border-white/20 bg-slate-900/60 px-3 py-2 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            min={0}
            max={100}
          />
          <button
            onClick={addGoal}
            className="rounded-lg bg-gradient-to-r from-emerald-400 to-teal-500 px-4 py-2 font-semibold text-white shadow-lg transition hover:scale-[1.01]"
          >
            Add Goal
          </button>
        </div>
      </div>
      {error && <div className="rounded-lg border border-red-400 bg-red-500/20 p-2 text-red-100">{error}</div>}
      <div className="space-y-3">
        {goals.map((goal) => (
          <div key={goal._id} className="rounded-2xl border border-white/10 bg-white/10 p-4 shadow-lg backdrop-blur-lg">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-white">{goal.title}</h3>
                <p className="text-sm text-slate-300">Progress: {goal.progress}%</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => updateProgress(goal, -10)}
                  className="rounded-lg border border-white/20 bg-slate-700/70 px-3 py-1 text-xs text-white transition hover:bg-slate-500"
                >
                  -10
                </button>
                <button
                  onClick={() => updateProgress(goal, 10)}
                  className="rounded-lg bg-emerald-500 px-3 py-1 text-xs text-white transition hover:bg-emerald-600"
                >
                  +10
                </button>
                <button
                  onClick={() => deleteGoal(goal._id)}
                  className="rounded-lg bg-red-500 px-3 py-1 text-xs text-white transition hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 transition-all"
                style={{ width: `${goal.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Goals;
