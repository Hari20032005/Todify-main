// components/AddTodo.js
import React, { useState } from 'react';
import { db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';
import styles from './AddTodo.module.css';

function AddTodo() {
  const [todo, setTodo] = useState('');
  const [error, setError] = useState('');

  const handleAddTodo = async (e) => {
    e.preventDefault();
    setError('');
    if (todo.trim()) {
      try {
        await addDoc(collection(db, 'todos'), { text: todo, completed: false });
        setTodo('');
      } catch (error) {
        setError('Error adding todo: ' + error.message);
      }
    } else {
      setError('Please enter a valid todo.');
    }
  };

  return (
    <div className={styles.addTodo}>
      <form onSubmit={handleAddTodo} className={styles.form}>
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="Add new todo"
          className={styles.input}
        />
        <button type="submit" className={styles.addBtn}>Add</button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

export default AddTodo;