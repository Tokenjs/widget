import { h } from 'hyperapp';
import Step from './Step';
import FormLabel from '../forms/FormLabel';
import Spinner from '../common/Spinner';
import QrCode from '../common/QrCode';
import WalletAddress from '../common/WalletAddress';
import styles from './DepositStep.scss';

const DepositStep = () => (
  <Step title="Send your contribution to the wallet address below">
    <div className={styles.pendingMessage}>
      <Spinner className={styles.pendingSpinner} />
      Awaiting transaction…
    </div>
    <div className={styles.walletAddress}>
      <FormLabel>Ethereum Wallet Address</FormLabel>
      <WalletAddress value="0xEf50Eb589aa3269754A781a3a6bd3D9e980f7Be2" />
    </div>
    <div className={styles.qrCode}>
      <QrCode size={520} value="0xEf50Eb589aa3269754A781a3a6bd3D9e980f7Be2" />
    </div>
  </Step>
);

export default DepositStep;
