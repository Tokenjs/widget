import { h } from 'hyperapp';
import styles from './FormError.scss';

const FormError = (state, children) => (
  <div className={styles.root}>
    {children}
  </div>
);

export default FormError;
