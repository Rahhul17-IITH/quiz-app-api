import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard=()=>{
 return(
   <div className="max-w-lg mx-auto mt-10">
     <h2 className="text-xl font-bold mb-4">Quiz Dashboard</h2>
     <ul>
       <li><Link to="/create" className="text-blue-500">➕ Create New Quiz</Link></li>
       <li><Link to="/quizzes" className="text-blue-500">📚 View All Quizzes</Link></li>
     </ul>
   </div>
 );
};

export default Dashboard;
