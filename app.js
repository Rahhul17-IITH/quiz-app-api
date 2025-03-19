const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
console.log(process.env.MONGODB_URI); // Verify the URI is loaded
dotenv.config();

const app = express();
app.use(express.json());
app.use((req, res, next) => {
    if (req.method === 'POST' || req.method === 'PUT') {
      express.json()(req, res, next);
    } else {
      next();
    }
  });
  
require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI);


mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));



app.use('/api/auth', require('./routes/auth'));
app.use('/api/quizzes', require('./routes/quizzes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on 0.0.0.0:${PORT}`));
app.get('/', (req, res) => {
    res.send('Welcome to the Quiz App API!');
  });
  