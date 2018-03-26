import { h, Component } from 'preact';
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
  };

  goToScreen = screen => this.setState({ screen });

  render(props, state) {
    return (
      <div className={styles.root}>
        <div className={styles.modalWrapper}>
          <div className={styles.modal}>
            <MerchantHeader />
            <div className={styles.body}>
              {state.screen === 'contributor' && (
                <ContributorStep
                  onSubmitted={() => {
                    this.goToScreen('method');
                    return Promise.resolve();
                  }}
                />
              )}
              {state.screen === 'method' && (
                <MethodStep onNextStep={() => this.goToScreen('deposit')} />
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
