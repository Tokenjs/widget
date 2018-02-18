import { h } from 'hyperapp';
import Step from './Step';
import FormLabel from '../forms/FormLabel';
import Icon from '../common/Icon';
import QrCode from '../common/QrCode';
import WalletAddress from '../common/WalletAddress';
import loaderIcon from '!raw-loader!feather-icons/dist/icons/loader.svg'; // eslint-disable-line
import styles from './DepositStep.scss';

const DepositStep = () => (
  <Step title="Send your contribution to the wallet address below">
    <div className={styles.pendingMessage}>
      <Icon className={styles.pendingIcon} svg={loaderIcon} />
      Awaiting contribution…
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
