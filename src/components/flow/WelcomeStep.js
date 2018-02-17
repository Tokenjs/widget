import { h } from 'hyperapp';
import component from 'hyperapp-nestable';

const WelcomeStep = component(
  { name: 'John' },
  {},
  state => (
    <div>
      <h1>
        Welcome, {state.name}!
      </h1>
      <button type="button" onclick={state.onNextStep}>Continue</button>
    </div>
  )
);

export default WelcomeStep;
