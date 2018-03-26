import { h } from 'preact';
import classnames from 'classnames';
import styles from './FormLabel.scss';

const FormLabel = ({ className, ...props }) => (
  <label className={classnames(styles.root, className)} {...props} />
);

export default FormLabel;
