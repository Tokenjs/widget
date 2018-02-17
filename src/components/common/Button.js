import { h } from 'hyperapp';
import classnames from 'classnames';
import styles from './Button.scss';

const Button = ({ className, variant, ...props }, children) => (
  <button className={classnames(styles.root, styles[variant], className)} {...props}>
    {children}
  </button>
);

export default Button;
