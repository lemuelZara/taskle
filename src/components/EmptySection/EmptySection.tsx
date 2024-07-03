import styles from './EmptySection.module.css';
import clipboard from '../../assets/Clipboard.svg';

export function EmptySection() {
  return (
    <article className={styles.article}>
      <img src={clipboard} alt="" />
      <hgroup>
        <h4>You don't have any tasks registered yet</h4>
        <p>Create tasks and organize your to-do items</p>
      </hgroup>
    </article>
  )
}
