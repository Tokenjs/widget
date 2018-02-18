import { h } from 'hyperapp';
import classnames from 'classnames';
import styles from './Spinner.scss';

const Spinner = ({ className }) => (
  <div className={classnames(styles.root, className)}>
    <div className={styles.ring} />
    <div className={styles.spinner} />
  </div>
);

export default Spinner;
