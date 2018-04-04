import { h, Component } from 'preact';
import apiClient from '../api';
import Icon from './common/Icon';
import MerchantHeader from './flow/MerchantHeader';
import ContributorStep from './flow/ContributorStep';
import MethodStep from './flow/MethodStep';
import DepositStep from './flow/DepositStep';
import closeIcon from '!raw-loader!feather-icons/dist/icons/x.svg'; // eslint-disable-line
import styles from './App.scss';

const POLL_FOR_PAYMENTS_EVERY_MS = 2000;
const TEMPORARY_ACCESS_TOKEN = 'X-Temporary-Access-Key';

class App extends Component {
  state = {
    screen: 'contributor',
    contribution: undefined,
    temporaryAccessKey: undefined,
  };

  goToScreen = screen => this.setState({ screen });

  saveContributor = contributor => (
    apiClient().post('/contributions', {
      destinationWalletAddress: contributor.wallet,
      type: 'crypto',
      currency: 'ETH',
      data: {
        email: contributor.email,
      },
    })
      .then((contribution) => {
        const { temporaryAccessKey, ...restOfContribution } = contribution;

        this.setState({ contribution: restOfContribution, temporaryAccessKey });
        this.goToScreen('method');
      })
  );

  saveMethod = currency => (
    apiClient().patch(`/contributions/${this.state.contribution.id}`, { currency }, {
      headers: {
        [TEMPORARY_ACCESS_TOKEN]: this.state.temporaryAccessKey,
      },
    })
      .then((contribution) => {
        this.setState({ contribution });
        this.goToScreen('deposit');
        this.pollForPayments();
      })
  );

  pollForPayments = () => (
    apiClient().get(`/contributions/${this.state.contribution.id}?$populate=Payments`, {
      headers: {
        [TEMPORARY_ACCESS_TOKEN]: this.state.temporaryAccessKey,
      },
    })
      .then((contribution) => {
        this.setState({ contribution });
        if (!contribution.Payments.length) {
          setTimeout(this.pollForPayments, POLL_FOR_PAYMENTS_EVERY_MS);
        }
      })
  );

  render(props, { screen, contribution }) {
    return (
      <div className={styles.root}>
        <div className={styles.modalWrapper}>
          <div className={styles.modal}>
            <MerchantHeader />
            <div className={styles.body}>
              {screen === 'contributor' && (
                <ContributorStep onSubmitted={this.saveContributor} />
              )}
              {screen === 'method' && (
                <MethodStep onSelected={this.saveMethod} />
              )}
              {screen === 'deposit' && (
                <DepositStep
                  payment={contribution.Payments && contribution.Payments[0]}
                  depositWalletAddress={contribution.depositWalletAddress}
                />
              )}
            </div>
            <button className={styles.closeButton} onClick={() => this.goToScreen('contributor')}>
              <Icon className={styles.closeIcon} svg={closeIcon} />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
