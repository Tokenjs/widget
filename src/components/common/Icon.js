import { h } from 'hyperapp';
import classnames from 'classnames';
import { dangerouslySetInnerHTML } from '../../utils/renderUtils';
import styles from './Icon.scss';

const Icon = ({ className, svg }) => (
  <i className={classnames(styles.root, className)} oncreate={dangerouslySetInnerHTML(svg)} />
);

export default Icon;
