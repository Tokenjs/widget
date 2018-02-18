import { h } from 'hyperapp';
import styles from './Step.scss';

const Step = ({ title }, children) => (
  <section className={styles.root}>
    <h1 className={styles.title}>{title}</h1>
    {children}
  </section>
);

export default Step;
