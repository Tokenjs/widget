import { h } from 'hyperapp';
import classnames from 'classnames';
import styles from './FormControl.scss';

const FormControl = ({ className }) => (
  <input className={classnames(styles.root, className)} />
);

export default FormControl;
