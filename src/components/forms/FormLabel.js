import { h } from 'hyperapp';
import classnames from 'classnames';
import styles from './FormLabel.scss';

const FormLabel = ({ className, ...props }, children) => (
  <label className={classnames(styles.root, className)} {...props}>
    {children}
  </label>
);

export default FormLabel;
