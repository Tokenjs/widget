import { h } from 'preact';
import classnames from 'classnames';
import styles from './Icon.scss';

const Icon = ({ className, svg }) => (
  <i
    className={classnames(styles.root, className)}
    dangerouslySetInnerHTML={{ __html: svg }} // eslint-disable-line react/no-danger
  />
);

export default Icon;
