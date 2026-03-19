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
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-3">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm uppercase text-slate-400">Tasks</p>
          <p className="text-3xl font-bold">{counts.tasks}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm uppercase text-slate-400">Completed</p>
          <p className="text-3xl font-bold">{counts.completed}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm uppercase text-slate-400">Notes</p>
          <p className="text-3xl font-bold">{counts.notes}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm uppercase text-slate-400">Goals</p>
          <p className="text-3xl font-bold">{counts.goals}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
