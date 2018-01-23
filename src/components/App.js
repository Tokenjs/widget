import { h } from 'hyperapp';
import component from 'hyperapp-nestable';
import WelcomeStep from './WelcomeStep';
import MethodStep from './MethodStep';

const App = component(
  { currentStep: 'welcome' },
  {
    goTo: step => () => ({ currentStep: step }),
  },
  (state, actions) => (
    <div>
      {state.currentStep === 'welcome' && (
        <WelcomeStep onNextStep={() => actions.goTo('method')} />
      )}
      {state.currentStep === 'method' && (
        <MethodStep />
      )}
    </div>
  ),
  'x-app'
);

export default App;
