// components/TodoList.js
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, onSnapshot, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import TodoItem from './TodoItem';
import styles from './TodoList.module.css';

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'todos'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ id: doc.id, ...doc.data() });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe();
  }, []);

  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, 'todos', todo.id), { completed: !todo.completed });
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'todos', id));
  };

  return (
    <ul className={styles.todoList}>
      {todos.map((todo) => (
        <TodoItem 
          key={todo.id} 
          todo={todo} 
          toggleComplete={toggleComplete} 
          onDelete={handleDelete} 
        />
      ))}
    </ul>
  );
}

export default TodoList;