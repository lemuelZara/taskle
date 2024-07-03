import { ChangeEvent, InputHTMLAttributes } from 'react';

import styles from './Checkbox.module.css';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  taskId: number;
  taskName: string;
  isChecked: boolean;
  onCheckTask: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function Checkbox(props: CheckboxProps) {
  return (
    <div className={styles.checkboxWrapper}>
      <input
        type="checkbox"
        name={props.name}
        id={props.taskId.toString()}
        checked={props.isChecked}
        className={styles.checkboxInput}
        onChange={props.onCheckTask}
      />
      <label htmlFor={props.taskId.toString()} className={styles.checkboxLabel}>
        <span>
          <svg width="12px" height="9px" viewBox="0 0 12 9">
            <polyline points="1 5 4 8 11 1"></polyline>
          </svg>
        </span>
        <span>{props.taskName}</span>
      </label>
    </div>
  )
}
