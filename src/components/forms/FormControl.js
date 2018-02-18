import { h } from 'hyperapp';
import classnames from 'classnames';
import styles from './FormControl.scss';

const FormControl = ({ className, ...props }) => (
  <input className={classnames(styles.root, className)} {...props} />
);

export default FormControl;
