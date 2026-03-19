import Goal from '../models/Goal.js';

export const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(goals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Could not fetch goals' });
  }
};

export const createGoal = async (req, res) => {
  try {
    const { title, progress } = req.body;
    if (!title) return res.status(400).json({ message: 'Goal title is required' });

    const goal = await Goal.create({
      title,
      progress: Number(progress) || 0,
      userId: req.user.id,
    });
    res.status(201).json(goal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Could not create goal' });
  }
};

export const updateGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const goal = await Goal.findOneAndUpdate({ _id: id, userId: req.user.id }, updates, { new: true });
    if (!goal) return res.status(404).json({ message: 'Goal not found' });
    res.json(goal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Could not update goal' });
  }
};

export const deleteGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const goal = await Goal.findOneAndDelete({ _id: id, userId: req.user.id });
    if (!goal) return res.status(404).json({ message: 'Goal not found' });
    res.json({ message: 'Goal deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Could not delete goal' });
  }
};
