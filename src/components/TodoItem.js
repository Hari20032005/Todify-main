// components/TodoItem.js
import React from 'react';
import styles from './TodoItem.module.css';

function TodoItem({ todo, toggleComplete, onDelete }) {
  return (
    <li className={`${styles.todoItem} ${todo.completed ? styles.completed : ''}`}>
      <span onClick={() => toggleComplete(todo)} className={styles.todoText}>
        {todo.text}
      </span>
      <button onClick={() => onDelete(todo.id)} className={styles.deleteBtn}>
        Delete
      </button>
    </li>
  );
}

export default TodoItem;