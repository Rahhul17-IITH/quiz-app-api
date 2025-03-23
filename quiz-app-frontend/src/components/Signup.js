// import React, { useState } from 'react';
// import API from '../api';
// import { useNavigate } from 'react-router-dom';

// const Signup = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSignup = async () => {
//     try {
//       await API.post('/auth/register', { username, password });
//       alert('Signup successful! Please login.');
//       navigate('/');
//     } catch (error) {
//       if (error.response && error.response.data.message === 'Username already exists.') {
//         alert('Username already exists.');
//       } else {
//         alert('Signup failed!');
//       }
//     }
//   };
  

//   return (
//     <div>
//       <h2>Sign Up</h2>
//       <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
//       <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//       <button onClick={handleSignup}>Sign Up</button>
//     </div>
//   );
// };

// export default Signup;


import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await API.post('/auth/register', { username, password });
      alert('Signup successful! Please login.');
      navigate('/');
    } catch (error) {
      console.error('Signup error:', error.response?.data || error.message);
      alert('Signup failed!');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
        />
        <button
          onClick={handleSignup}
          className="bg-green-500 text-white p-2 w-full rounded hover:bg-green-600"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Signup;
