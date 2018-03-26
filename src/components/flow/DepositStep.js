import { h } from 'preact';
import classnames from 'classnames';
import FormLabel from '../forms/FormLabel';
import Spinner from '../common/Spinner';
import QrCode from '../common/QrCode';
import WalletAddress from '../common/WalletAddress';
import Step from './Step';
import styles from './DepositStep.scss';

const DepositStep = ({ payment, depositWalletAddress }) => (
  <Step title="Send your contribution to the wallet address below">
    {payment ? (
      <div className={classnames(styles.message, styles.messageSuccess)}>
        {Math.round(payment.originalAmount)} wei received!
      </div>
    ) : (
      <div className={classnames(styles.message, styles.messagePending)}>
        <Spinner className={styles.pendingSpinner} />
        Awaiting transaction…
      </div>
    )}
    <div className={styles.walletAddress}>
      <FormLabel>Ethereum Wallet Address</FormLabel>
      <WalletAddress value={depositWalletAddress} />
    </div>
    <div className={styles.qrCode}>
      <QrCode size={520} value={depositWalletAddress} />
    </div>
  </Step>
);

export default DepositStep;
