import { h } from 'preact';
import classnames from 'classnames';
import styles from './Button.scss';

const Button = ({ className, variant, ...props }) => (
  <button className={classnames(styles.root, styles[variant], className)} {...props} />
);

export default Button;
