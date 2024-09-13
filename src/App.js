// App.js
import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import Login from './components/Login';
import styles from './App.module.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
      console.log('User signed out');
    }).catch((error) => {
      console.error('Logout error:', error);
    });
  };

  return (
    <div className={styles.app}>
      {user ? (
        <>
          <header className={styles.header}>
            <h1 className={styles.title}>Todo List</h1>
            <button className={styles.logoutBtn} onClick={handleLogout}>Logout</button>
          </header>
          <main className={styles.main}>
            <AddTodo />
            <TodoList />
          </main>
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;