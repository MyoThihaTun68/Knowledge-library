import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../firebase'; // Make sure to import your Firebase configuration
import { useNavigate } from 'react-router-dom';

const useSignUp = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    // Basic email format validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const signUp = async (email, password, username) => {
    try {
      setLoading(true);
      setError(null);
      
      if (!validateEmail(email)) {
        throw new Error('Please enter a valid email address.');
      }

      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Store user data in Firestore
      const usersCollectionRef = collection(db, 'users');
      await addDoc(usersCollectionRef, {
        userId: userCredential.user.uid,
        email,
        username,
      });
      navigate('/login');
      setLoading(false);
      setSuccess(true);
    } catch (error) {
      setLoading(false);
      let errorMessage = 'An error occurred while signing up. Please try again later.';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'The email address is already in use by another account.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'The password is too weak.';
      }
      setErrorMessage(errorMessage);
      setSuccess(false);
    }
  };

  return { error, loading, success, signUp, errorMessage };
};

export default useSignUp;
