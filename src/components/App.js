import { h } from 'hyperapp';
import component from 'hyperapp-nestable';
import Icon from './common/Icon';
import MerchantHeader from './flow/MerchantHeader';
import ContributorStep from './flow/ContributorStep';
import WelcomeStep from './flow/WelcomeStep';
import MethodStep from './flow/MethodStep';
import closeIcon from '!raw-loader!feather-icons/dist/icons/x.svg'; // eslint-disable-line
import styles from './App.scss';

const App = component(
  { currentStep: 'contributor' },
  {
    goTo: step => () => ({ currentStep: step }),
  },
  (state, actions) => (
    <div className={styles.root}>
      <div className={styles.modal}>
        <MerchantHeader />
        <div className={styles.body}>
          {state.currentStep === 'contributor' && (
            <ContributorStep onNextStep={() => actions.goTo('method')} />
          )}
          {state.currentStep === 'welcome' && (
            <WelcomeStep onNextStep={() => actions.goTo('method')} />
          )}
          {state.currentStep === 'method' && (
            <MethodStep />
          )}
        </div>
        <button className={styles.closeButton}>
          <Icon className={styles.closeIcon} svg={closeIcon} />
        </button>
      </div>
    </div>
  ),
  'x-app'
);

export default App;
