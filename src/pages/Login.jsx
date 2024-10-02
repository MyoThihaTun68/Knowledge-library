import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import useLogin from '../hooks/useLogin';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { error, loading, success, login } = useLogin(); // Use login function from useLogin hook
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password); // Call the login function
      localStorage.setItem('email', email);
      // Check if login was successful
      if (success) {
        navigate('/home'); // Navigate to the home page if login is successful
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } catch (error) {
      // Handle login error
      console.error('Login failed:', error);
      setError('Invalid email or password. Please try again.');
    }
  };
    
  

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center text-white">Login</h2>
      <form onSubmit={handleLogin} className="max-w-sm mx-auto mb-8">
        <div className="mb-4">
          <label htmlFor="loginEmail" className="block text-sm font-semibold mb-2 text-white">Email:</label>
          <input type="email" id="loginEmail" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="loginPassword" className="block text-sm text-white font-semibold mb-2">Password:</label>
          <input type="password" id="loginPassword" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
          {error && <p className="text-red-500">{error}</p>}
        </div>
        <button type="submit" className="w-full bg-sky-500 text-white py-2 px-4 rounded-md hover:bg-blue-600" disabled={loading}>{loading ? 'Logging In...' : 'Login'}</button>
      </form>
      {/* Add a button to navigate to the signup page */}
      <div className="text-center">
        <p className='text-zinc-400'>Don't have an account?</p>
        <Link to="/" className="text-blue-500 underline hover:text-sky-700">Create Account</Link>
      </div>  
    </div>
  );
}

export default Login;
