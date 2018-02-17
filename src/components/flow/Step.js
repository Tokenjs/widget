import { h } from 'hyperapp';
import styles from './Step.scss';

const Step = ({ title, renderAction }, children) => (
  <section className={styles.root}>
    <h1 className={styles.title}>{title}</h1>
    {children}
    <div className={styles.actions}>
      {renderAction()}
    </div>
  </section>
);

export default Step;
