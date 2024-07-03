import { ChangeEvent, MouseEvent, useState } from 'react';
import { PlusCircle } from '@phosphor-icons/react';

import { Header } from './components/Header';
import { EmptySection } from './components/EmptySection';
import { Todo } from './components/Todo';

import styles from './App.module.css';

type Todo = {
  id: number;
  name: string;
  isCompleted?: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<Todo>({ id: 0, name: '', isCompleted: false });

  function handleChangeTodo(event: ChangeEvent<HTMLInputElement>) {
    const todo: Todo = {
      id: todos.length + 1,
      name: event.target.value,
      isCompleted: false
    };

    setNewTodo(todo);
  }

  function handleCompletedTodo(event: ChangeEvent<HTMLInputElement>, id: number) {
    const todoToBeCompleted = todos.map(t => {
      if (t.id === id) {
        return { ...t, isCompleted: event.target.checked };
      }

      return t;
    })!;

    setTodos(todoToBeCompleted);
  }

  function handleAddTodo(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    setTodos((prevState) => [...prevState, newTodo!]);
    setNewTodo({ id: 0, name: '' });
  }

  function handleDeleteTodo(event: MouseEvent<HTMLButtonElement>, id: number) {
    event.preventDefault();

    const todosWithoutDeletedOne = todos.filter(t => t.id !== id);

    setTodos(todosWithoutDeletedOne);
  }

  const isNewTodoEmpty = newTodo.name.length === 0;

  const completedTodos = todos.filter(t => t.isCompleted).length;

  function renderCreatedTodos() {
    return <p>Tasks created <span>{todos.length}</span></p>
  }

  function renderCompletedTodos() {
    if (completedTodos === 0) {
      return <p>Completed <span>{completedTodos}</span></p>
    }

    return <p>Completed <span>{completedTodos} of {todos.length}</span></p>
  }

  return (
    <>
      <Header />

      <main className={styles.main}>
        <form className={styles.todoForm}>
          <div className={styles.todoInput}>
            <label htmlFor="todo" />
            <input
              type="text"
              name="todo"
              id="todo"
              placeholder="Add a new task"
              value={newTodo.name}
              onChange={handleChangeTodo}
            />
          </div>

          <div className={styles.todoButton}>
            <button
              title="Create task"
              disabled={isNewTodoEmpty}
              onClick={handleAddTodo}>
              Create <PlusCircle size={24} />
            </button>
          </div>
        </form>

        <header className={styles.header}>
          <div className={styles.createdTodos}>
            {renderCreatedTodos()}
          </div>

          <div className={styles.completedTodos}>
            {renderCompletedTodos()}
          </div>
        </header>

        <section className={styles.section}>
          {todos.length === 0 && (
            <EmptySection />
          )}
          {todos.map(t => (
            <Todo
              id={t.id}
              name={t.name}
              isCompleted={t.isCompleted!}
              onComplete={event => handleCompletedTodo(event, t.id)}
              onDelete={event => handleDeleteTodo(event, t.id)}
            />
          ))}
        </section>
      </main>
    </>
  )
}

export { App } 
