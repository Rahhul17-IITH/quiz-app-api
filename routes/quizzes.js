const express = require('express');
const Quiz = require('../models/Quiz');
const auth = require('../middleware/auth');

const router = express.Router();


router.post('/', auth, async (req, res) => {
  try {
    const { title, questions } = req.body;
    const quiz = new Quiz({ title, questions, creator: req.user });
    await quiz.save();
    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get('/', auth, async (req, res) => {
  try {
    const quizzes = await Quiz.find({ creator: req.user });
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get('/:id', auth, async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ _id: req.params.id, creator: req.user });
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.put('/:id', auth, async (req, res) => {
  try {
    const { title, questions } = req.body;
    const quiz = await Quiz.findOneAndUpdate(
      { _id: req.params.id, creator: req.user },
      { title, questions },
      { new: true }
    );
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.delete('/:id', auth, async (req, res) => {
  try {
    const quiz = await Quiz.findOneAndDelete({ _id: req.params.id, creator: req.user });
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
