import styles from './Header.module.css';
import taskleLogo from '../../assets/TaskleLogo.svg';

export function Header() {
  return (
    <header className={styles.header}>
      <img src={taskleLogo} alt="Taskle logo" />
    </header>
  )
}
