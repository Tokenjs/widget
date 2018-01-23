import { h } from 'hyperapp';
import component from 'hyperapp-nestable';

const MethodStep = component(
  {},
  {},
  () => (
    <h2>
      Select Contribution Method
    </h2>
  ),
  'x-method-step'
);

export default MethodStep;
