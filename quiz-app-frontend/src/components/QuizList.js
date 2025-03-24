import React, { useEffect, useState } from 'react';
import API from '../api';

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await API.get('/quizzes');
        setQuizzes(res.data);
      } catch (error) {
        console.error('Error fetching quizzes:', error.response?.data || error.message);
        alert('Failed to fetch quizzes.');
      }
    };
    fetchQuizzes();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">All Quizzes</h2>
      {quizzes.length === 0 ? (
        <p>No quizzes found.</p>
      ) : (
        quizzes.map((quiz) => (
          <div key={quiz._id} className="mb-6 border p-4 rounded">
            <h3 className="font-semibold text-lg">{quiz.title}</h3>
            <ul className="mt-4">
              {quiz.questions.map((question, index) => (
                <li key={index} className="mb-2">
                  <strong>Q{index + 1}: </strong>{question.text}
                  <ul className="ml-4">
                    {question.options.map((option, optionIndex) => (
                      <li key={optionIndex}>Option {optionIndex + 1}: {option}</li>
                    ))}
                  </ul>
                  <p><strong>Correct Answer:</strong> Option {question.correctAnswer + 1}</p>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default QuizList;

