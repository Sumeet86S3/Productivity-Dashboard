import { useEffect, useState } from 'react';
import api from '../api/axios';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const loadNotes = async () => {
    try {
      const res = await api.get('/notes');
      setNotes(res.data);
    } catch (err) {
      console.error(err);
      setError('Could not load notes');
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const addNote = async () => {
    if (!title.trim()) return;
    try {
      const res = await api.post('/notes', { title, description });
      setNotes((prev) => [res.data, ...prev]);
      setTitle('');
      setDescription('');
      setError('');
    } catch (err) {
      console.error(err);
      setError('Could not add note');
    }
  };

  const deleteNote = async (id) => {
    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      console.error(err);
      setError('Could not delete note');
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-white/10 bg-white/10 p-4 shadow-xl backdrop-blur-lg">
        <h2 className="mb-2 text-2xl font-extrabold text-white">Notes</h2>
        <div className="grid gap-2 md:grid-cols-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full rounded-lg border border-white/20 bg-slate-900/60 px-3 py-2 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="w-full rounded-lg border border-white/20 bg-slate-900/60 px-3 py-2 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
            rows={3}
          />
          <button
            onClick={addNote}
            className="rounded-lg bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-4 py-2 font-semibold text-white shadow-lg transition hover:scale-[1.01]"
          >
            Add Note
          </button>
        </div>
      </div>
      {error && <div className="rounded-lg border border-red-400 bg-red-500/20 p-2 text-red-100">{error}</div>}
      <div className="grid gap-3 md:grid-cols-2">
        {notes.map((note) => (
          <article
            key={note._id}
            className="rounded-2xl border border-white/10 bg-white/10 p-4 shadow-lg backdrop-blur-lg"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className=" text-lg font-semibold text-white">{note.title}</h3>
                <p className="mt-1 text-sm text-slate-200">{note.description}</p>
              </div>
              <button
                onClick={() => deleteNote(note._id)}
                className="rounded-lg bg-red-500 px-3 py-1 text-xs text-white transition hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Notes;
