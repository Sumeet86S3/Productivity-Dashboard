import { useEffect, useState } from 'react';
import api from '../api/axios';

const Dashboard = () => {
  const [counts, setCounts] = useState({ tasks: 0, completed: 0, notes: 0, goals: 0 });

  const loadCounts = async () => {
    try {
      const [tasksRes, notesRes, goalsRes] = await Promise.all([
        api.get('/tasks'),
        api.get('/notes'),
        api.get('/goals'),
      ]);
      const tasks = tasksRes.data;
      setCounts({
        tasks: tasks.length,
        completed: tasks.filter((t) => t.completed).length,
        notes: notesRes.data.length,
        goals: goalsRes.data.length,
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  };

  useEffect(() => {
    loadCounts();
  }, []);

  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur-lg">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-white">Welcome back!</h2>
            <p className="text-sm text-slate-300">Your progress at a glance.</p>
          </div>
          <div className="rounded-lg bg-slate-950/50 px-4 py-2 text-sm text-slate-200">All systems nominal</div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Tasks', value: counts.tasks, color: 'from-cyan-400 to-blue-500' },
          { label: 'Completed', value: counts.completed, color: 'from-emerald-400 to-teal-500' },
          { label: 'Notes', value: counts.notes, color: 'from-fuchsia-400 to-purple-500' },
          { label: 'Goals', value: counts.goals, color: 'from-amber-400 to-orange-500' },
        ].map((item) => (
          <article key={item.label} className="rounded-2xl border border-white/15 bg-white/10 p-4 shadow-xl backdrop-blur-lg">
            <p className="text-xs uppercase tracking-widest text-slate-300 mb-2">{item.label}</p>
            <p className="text-4xl font-bold text-white">{item.value}</p>
            <div className={`mt-3 h-2 w-full rounded-full bg-white/10 bg-gradient-to-r ${item.color}`} />
          </article>
        ))}
      </section>
    </div>
  );
};

export default Dashboard;
