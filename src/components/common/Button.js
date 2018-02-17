import { h } from 'hyperapp';
import classnames from 'classnames';
import styles from './Button.scss';

const Button = ({ className, variant }, children) => (
  <button className={classnames(styles.root, styles[variant], className)}>
    {children}
  </button>
);

export default Button;
