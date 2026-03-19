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
    <div className="p-4">
      <div className="mb-4 rounded bg-white p-3 shadow-sm">
        <h3 className="font-bold mb-2">Add Note</h3>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full p-2 border border-slate-300 rounded mb-2"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full p-2 border border-slate-300 rounded mb-2"
          rows={3}
        />
        <button onClick={addNote} className="rounded bg-indigo-500 px-3 py-2 text-white">
          Add Note
        </button>
      </div>
      {error && <div className="mb-3 text-red-600">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {notes.map((note) => (
          <div key={note._id} className="bg-white rounded p-3 shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">{note.title}</p>
                <p className="text-sm text-slate-600">{note.description}</p>
              </div>
              <button
                onClick={() => deleteNote(note._id)}
                className="rounded bg-red-500 text-white px-2 py-1 text-xs"
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

export default Notes;
