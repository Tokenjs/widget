import { h } from 'hyperapp';
import component from 'hyperapp-nestable';
import Icon from './common/Icon';
import MerchantHeader from './flow/MerchantHeader';
import ContributorStep from './flow/ContributorStep';
import MethodStep from './flow/MethodStep';
import DepositStep from './flow/DepositStep';
import closeIcon from '!raw-loader!feather-icons/dist/icons/x.svg'; // eslint-disable-line
import styles from './App.scss';

const App = component(
  { currentStep: 'contributor' },
  {
    goTo: step => () => ({ currentStep: step }),
  },
  ({ currentStep }, actions) => (
    <div className={styles.root}>
      <div className={styles.modalWrapper}>
        <div className={styles.modal}>
          <MerchantHeader />
          <div className={styles.body}>
            {currentStep === 'contributor' && (
              <ContributorStep onNextStep={() => actions.goTo('method')} />
            )}
            {currentStep === 'method' && (
              <MethodStep onNextStep={() => actions.goTo('deposit')} />
            )}
            {currentStep === 'deposit' && (
              <DepositStep />
            )}
          </div>
          <button className={styles.closeButton} onclick={() => actions.goTo('contributor')}>

            <Icon className={styles.closeIcon} svg={closeIcon} />
          </button>
        </div>
      </div>
    </div>
  ),
  'x-app'
);

export default App;
