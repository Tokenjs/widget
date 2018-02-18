import { h } from 'hyperapp';
import component from 'hyperapp-nestable';
import classnames from 'classnames';
import gotem from 'gotem';
import Button from '../common/Button';
import Icon from '../common/Icon';
import { FormControl } from '../forms';
import copyIcon from '!raw-loader!feather-icons/dist/icons/copy.svg'; // eslint-disable-line
import styles from './WalletAddress.scss';

const WalletAddress = component(
  {
    copied: false,
  },
  {
    markCopied: () => (_, actions) => {
      setTimeout(actions.clearCopied, 2000);
      return {
        copied: true,
      };
    },
    clearCopied: () => () => ({
      copied: false,
    }),
  },
  ({ value, copied }, actions) => (
    <div
      className={styles.root}
      oncreate={node => initCopy(node, () => actions.markCopied())}
    >
      <FormControl className={styles.input} value={value} readOnly />
      <Button className={styles.copyButton}>
        <Icon svg={copyIcon} />
      </Button>
      <p className={styles.text}>{value}</p>
      <div className={classnames(styles.copiedOverlay, copied && styles.copiedOverlayShown)}>Copied!</div>
    </div>
  )
);

function initCopy(node, onSuccess) {
  const triggerNode = node.querySelector('button');
  const textNode = node.querySelector('p');

  gotem(triggerNode, textNode, {
    success: onSuccess,
    error: () => window.alert('Failed to copy. It seems that your browser does not support this functionality.'),
  });
}

export default WalletAddress;
