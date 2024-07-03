import { ChangeEvent, MouseEvent } from 'react';
import { Trash } from '@phosphor-icons/react';

import { Checkbox } from '../Checkbox';

import styles from './Todo.module.css';

interface TodoProps {
  id: number;
  name: string;
  isCompleted: boolean;
  onComplete: (event: ChangeEvent<HTMLInputElement>, id: number) => void;
  onDelete: (event: MouseEvent<HTMLButtonElement>, id: number) => void;
}

export function Todo(props: TodoProps) {
  return (
    <article key={props.id} className={styles.article}>
      <Checkbox
        name="todo"
        taskId={props.id}
        taskName={props.name}
        isChecked={props.isCompleted}
        onCheckTask={event => props.onComplete(event, props.id)}
      />
      <button onClick={event => props.onDelete(event, props.id)}>
        <Trash size={24} />
      </button>
    </article>
  )
}
