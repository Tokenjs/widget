import { h } from 'hyperapp';
import classnames from 'classnames';
import styles from './FormGroup.scss';

const FormGroup = ({ className }, children) => (
  <div className={classnames(styles.root, className)}>
    {children}
  </div>
);

export default FormGroup;
