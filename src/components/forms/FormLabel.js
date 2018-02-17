import { h } from 'hyperapp';
import classnames from 'classnames';
import styles from './FormLabel.scss';

const FormLabel = ({ className }, children) => (
  <label className={classnames(styles.root, className)}>
    {children}
  </label>
);

export default FormLabel;
