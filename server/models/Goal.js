import mongoose from 'mongoose';

const goalSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  progress: { type: Number, default: 0, min: 0, max: 100 },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
}, { timestamps: true });

const Goal = mongoose.model('Goal', goalSchema);
export default Goal;
