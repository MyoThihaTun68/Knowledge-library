import { useState } from 'react';
import { signInWithEmailAndPassword, validatePassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

export default function useLogin() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    // Basic email format validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      if (!validateEmail(email)) {
        throw new Error('Please enter a valid email address.');
      }

      if (validateEmail(email) && validatePassword(password)) {
        // Sign in user with email and password using Firebase auth
        await signInWithEmailAndPassword(auth, email, password);
        setLoading(false);
        navigate('/home'); // Navigate to home only if email and password are valid
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setError(error.message); // Set error message if login fails
    }
  };

  return { error, loading, login };
}
