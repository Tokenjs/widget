import { h } from 'hyperapp';
import styles from './StepActions.scss';

const StepActions = (state, children) => (
  <div className={styles.root}>
    {children}
  </div>
);

export default StepActions;
