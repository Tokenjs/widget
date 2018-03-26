import { h, Component } from 'preact';
import classnames from 'classnames';
import gotem from 'gotem';
import Button from '../common/Button';
import Icon from '../common/Icon';
import { FormControl } from '../forms';
import copyIcon from '!raw-loader!feather-icons/dist/icons/copy.svg'; // eslint-disable-line
import styles from './WalletAddress.scss';

class WalletAddress extends Component {
  state = {
    copied: false,
  };

  componentDidMount() {
    gotem(this.triggerNode, this.textNode, {
      success: () => this.markCopied(),
      error: () =>
        // eslint-disable-next-line no-alert
        window.alert('Failed to copy. It seems that your browser does not support this functionality.'),
    });
  }

  markCopied = () => {
    this.setState({ copied: true });
    setTimeout(() => this.setState({ copied: false }), 2000);
  };

  render(props, state) {
    return (
      <div className={styles.root}>
        <FormControl className={styles.input} value={props.value} readOnly />
        <Button
          ref={(instance) => {
            this.triggerNode = instance.base;
          }}
          className={styles.copyButton}
        >
          <Icon svg={copyIcon} />
        </Button>
        <p
          ref={(node) => {
            this.textNode = node;
          }}
          className={styles.text}
        >
          {props.value}
        </p>
        <div className={classnames(styles.copiedOverlay, state.copied && styles.copiedOverlayShown)}>Copied!</div>
      </div>
    );
  }
}

export default WalletAddress;
