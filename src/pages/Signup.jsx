import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useSignUp from '../hooks/useSignUp';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const { error, loading, success, signUp, errorMessage } = useSignUp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem('email', email);
    signUp(email, password, username, () => {
      localStorage.setItem('email', email);
     
    });
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center text-white">Sign Up</h2>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto mb-8">
        <div className="mb-4">
          <label htmlFor="signupEmail" className="block text-sm font-semibold mb-2 text-white">Email:</label>
          <input type="email" id="signupEmail" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" required />
        </div>
        <div className="mb-4">
          <label htmlFor="signupPassword" className="block text-sm text-white font-semibold mb-2">Password:</label>
          <input type="password" id="signupPassword" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" required />
        </div>
        <div className="mb-4">
          <label htmlFor="signupUsername" className="block text-sm text-white font-semibold mb-2">Username:</label>
          <input type="text" id="signupUsername" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" required />
        </div>
        <button type="submit" className="w-full bg-sky-500 text-white py-2 px-4 rounded-md hover:bg-blue-600" disabled={loading}>{loading ? 'Creating acc...' : 'Create acc'}</button>
        {loading && <p className="text-sm mt-2 text-white text-center">Loading...</p>}
        {error && <p className="text-sm mt-2 text-red-500 text-center">{errorMessage}</p>}
        {success && <p className="text-sm mt-2 text-green-500 text-center">Sign up successful! <Link to="/login" className="text-blue-500 underline hover:text-blue-700">Login</Link></p>}
      </form>
      <div className="text-center">
        <p className='text-zinc-400'>Already have an account?</p>
        <Link to="/login" className="text-blue-500 underline hover:text-blue-700">Login</Link>
      </div>
    </div>
  );
};

export default SignUpPage;
