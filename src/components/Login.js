// components/Login.js
import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import styles from './Login.module.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isNewUser) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={styles.login}>
      <h2 className={styles.title}>{isNewUser ? 'Sign Up' : 'Login'}</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className={styles.input}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className={styles.input}
        />
        <button type="submit" className={styles.submitBtn}>
          {isNewUser ? 'Sign Up' : 'Login'}
        </button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
      <button 
        onClick={() => setIsNewUser(!isNewUser)}
        className={styles.toggleBtn}
      >
        {isNewUser ? 'Already have an account? Login' : 'New here? Sign Up'}
      </button>
    </div>
  );
}

export default Login;