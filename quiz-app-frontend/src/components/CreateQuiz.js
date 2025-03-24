import React, { useState } from 'react';
import API from '../api';

const CreateQuiz = () => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([
    { text: '', options: ['', '', '', ''], correctAnswer: 0 },
  ]);

  // Handle changes to the quiz title
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // Handle changes to a specific question
  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    if (field === 'text') {
      updatedQuestions[index].text = value;
    } else if (field === 'correctAnswer') {
      updatedQuestions[index].correctAnswer = parseInt(value);
    }
    setQuestions(updatedQuestions);
  };

  // Handle changes to a specific option
  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  // Add a new question
  const addQuestion = () => {
    setQuestions([
      ...questions,
      { text: '', options: ['', '', '', ''], correctAnswer: 0 },
    ]);
  };

  // Remove a question
  const removeQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  // Submit the quiz
  const createQuiz = async () => {
    try {
      await API.post('/quizzes', { title, questions });
      alert('Quiz created successfully!');
      setTitle('');
      setQuestions([{ text: '', options: ['', '', '', ''], correctAnswer: 0 }]);
    } catch (error) {
      console.error('Error creating quiz:', error.response?.data || error.message);
      alert('Failed to create quiz.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">Create Quiz</h2>

      {/* Quiz Title */}
      <input
        type="text"
        placeholder="Quiz Title"
        value={title}
        onChange={handleTitleChange}
        className="border p-2 w-full mb-4"
      />

      {/* Questions */}
      {questions.map((question, questionIndex) => (
        <div key={questionIndex} className="mb-6 border p-4 rounded">
          <h3 className="font-semibold">Question {questionIndex + 1}</h3>
          <input
            type="text"
            placeholder="Question Text"
            value={question.text}
            onChange={(e) =>
              handleQuestionChange(questionIndex, 'text', e.target.value)
            }
            className="border p-2 w-full mb-4"
          />

          {/* Options */}
          {question.options.map((option, optionIndex) => (
            <div key={optionIndex} className="mb-2">
              <input
                type="text"
                placeholder={`Option ${optionIndex + 1}`}
                value={option}
                onChange={(e) =>
                  handleOptionChange(questionIndex, optionIndex, e.target.value)
                }
                className="border p-2 w-full"
              />
            </div>
          ))}

          {/* Correct Answer */}
          <label className="block font-semibold mt-4">
            Correct Answer (0-based index):
          </label>
          <input
            type="number"
            min="0"
            max="3"
            value={question.correctAnswer}
            onChange={(e) =>
              handleQuestionChange(questionIndex, 'correctAnswer', e.target.value)
            }
            className="border p-2 w-full"
          />

          {/* Remove Question Button */}
          <button
            onClick={() => removeQuestion(questionIndex)}
            className="bg-red-500 text-white px-4 py-2 mt-4 rounded"
          >
            Remove Question
          </button>
        </div>
      ))}

      {/* Add Question Button */}
      <button
        onClick={addQuestion}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-6"
      >
        Add Question
      </button>

      {/* Submit Quiz Button */}
      <button
        onClick={createQuiz}
        className="bg-green-500 text-white px-4 py-2 rounded w-full"
      >
        Create Quiz
      </button>
    </div>
  );
};

export default CreateQuiz;


