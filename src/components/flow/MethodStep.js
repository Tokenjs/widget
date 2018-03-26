import { h } from 'preact';
import classnames from 'classnames';
import Button from '../common/Button';
import Icon from '../common/Icon';
import Step from './Step';
import ethIcon from '!raw-loader!cryptocoins-icons/SVG/ETH-alt.svg'; // eslint-disable-line
import btcIcon from '!raw-loader!cryptocoins-icons/SVG/BTC-alt.svg'; // eslint-disable-line
import ltcIcon from '!raw-loader!cryptocoins-icons/SVG/LTC-alt.svg'; // eslint-disable-line
import styles from './MethodStep.scss';

const MethodStep = ({ onSelected }) => (
  <Step title="Select contribution method">
    <div className={styles.root}>
      <Button
        className={classnames(styles.button, styles.buttonEthereum)}
        variant="primary"
        onClick={() => onSelected('ETH')}
      >
        <Icon className={styles.icon} svg={ethIcon} />
        Ethereum
        <span>ETH</span>
      </Button>
      <Button
        className={classnames(styles.button, styles.buttonBitcoin)}
        variant="primary"
        onClick={() => onSelected('BTC')}
      >
        <Icon className={styles.icon} svg={btcIcon} />
        Bitcoin
        <span>BTC</span>
      </Button>
      <Button
        className={classnames(styles.button, styles.buttonLitecoin)}
        variant="primary"
        onClick={() => onSelected('LTC')}
      >
        <Icon className={styles.icon} svg={ltcIcon} />
        Litecoin
        <span>LTC</span>
      </Button>
    </div>
  </Step>
);

export default MethodStep;
