import { h } from 'preact';
import classnames from 'classnames';
import styles from './FormGroup.scss';

const FormGroup = ({ className, ...props }) => (
  <div className={classnames(styles.root, className)} {...props} />
);

export default FormGroup;
