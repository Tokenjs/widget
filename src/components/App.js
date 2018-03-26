import { h, Component } from 'preact';
import apiClient from '../api';
import Icon from './common/Icon';
import MerchantHeader from './flow/MerchantHeader';
import ContributorStep from './flow/ContributorStep';
import MethodStep from './flow/MethodStep';
import DepositStep from './flow/DepositStep';
import closeIcon from '!raw-loader!feather-icons/dist/icons/x.svg'; // eslint-disable-line
import styles from './App.scss';

class App extends Component {
  state = {
    screen: 'contributor',
    contribution: undefined,
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
        this.setState({ contribution });
        this.goToScreen('method');
      })
  );

  saveMethod = currency => (
    apiClient().patch(`/contributions/${this.state.contribution.id}`, { currency })
      .then(() => {
        this.setState(state => ({
          contribution: {
            ...state.contribution,
            currency,
          },
        }));
        this.goToScreen('deposit');
      })
  );

  render(props, state) {
    return (
      <div className={styles.root}>
        <div className={styles.modalWrapper}>
          <div className={styles.modal}>
            <MerchantHeader />
            <div className={styles.body}>
              {state.screen === 'contributor' && (
                <ContributorStep onSubmitted={this.saveContributor} />
              )}
              {state.screen === 'method' && (
                <MethodStep onSelected={this.saveMethod} />
              )}
              {state.screen === 'deposit' && (
                <DepositStep />
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
