import { ChangeEvent, MouseEvent, useState } from 'react';

import styles from './App.module.css';
import { Header } from './Header';

type Todo = {
  id: number;
  name: string;
  isCompleted?: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<Todo>({ id: 0, name: '', isCompleted: false });

  function handleChangeTodo(event: ChangeEvent<HTMLInputElement>) {
    setNewTodo({ id: todos.length + 1, name: event.target.value, isCompleted: false });
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

  function renderCompletedTextTodos() {
    if (completedTodos === 0) {
      return <p>Concluídas - <span>{completedTodos}</span></p>
    }

    return <p>Concluídas - <span>{completedTodos} de {todos.length}</span></p>
  }

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div>
          <input type="text" placeholder="Adicione uma nova tarefa" onChange={handleChangeTodo} value={newTodo.name} />
          <button onClick={handleAddTodo} disabled={isNewTodoEmpty}>Criar</button>
        </div>

        <div>
          <div>
            <p>Tarefas criadas - <span>{todos.length}</span></p>
            {renderCompletedTextTodos()}
          </div>
        </div>

        <section>
          {todos.length === 0 && (
            <p>Seção vazia.</p>
          )}
          {todos.map(t => (
            <div key={t.id}>
              <div>
                <input
                  type="checkbox"
                  name={t.name}
                  id={`todo-${t.id}`}
                  value={t.name}
                  checked={t.isCompleted}
                  onChange={(event) => handleCompletedTodo(event, t.id)}
                />
                <label htmlFor={`todo-checkbox-${t.id}`}>{t.name}</label>
              </div>

              <button onClick={(event) => handleDeleteTodo(event, t.id)}>Deletar</button>
            </div>
          ))}
        </section>
      </main>
    </>
  )
}

export { App } 
