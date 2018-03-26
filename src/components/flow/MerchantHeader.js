import { h } from 'preact';
import styles from './MerchantHeader.scss';

const MerchantHeader = () => (
  <header className={styles.root}>
    <h1 className={styles.title}>
      <span>Contribute to <strong>Token.js</strong></span>
      and receive <strong>TJS</strong> token
    </h1>
  </header>
);

export default MerchantHeader;
