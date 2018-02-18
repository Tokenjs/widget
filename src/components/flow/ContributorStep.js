import { h } from 'hyperapp';
import Step from './Step';
import StepActions from './StepActions';
import Button from '../common/Button';
import { FormGroup, FormLabel, FormControl } from '../forms';
import component from 'hyperapp-nestable';

const ContributorStep = component(
  {
    values: {
      email: '',
      wallet: '',
    },
    validation: {
      email: '',
      wallet: '',
    },
    onNextStep: () => {},
  },
  {
    updateField: event => ({ values }) => ({
      validation: validate(values),
      values: {
        ...values,
        [event.target.name]: event.target.value,
      },
    }),
    submitForm: event => ({ values, validation, onNextStep }) => {
      event.preventDefault();

      const valid = !Object.values(validation).filter(val => val).length;
      if (!valid) {
        return;
      }

      // TODO: save contributor
      console.log(values);

      onNextStep();
    },
  },
  ({ values }, actions) => (
    <Step title="Enter your details">
      <form noValidate onsubmit={actions.submitForm}>
        <FormGroup>
          <FormLabel for="contributor-email">
            E-mail address
          </FormLabel>
          <FormControl
            type="email"
            name="email"
            id="contributor-email"
            value={values.email}
            oninput={actions.updateField}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel for="contributor-wallet">
            Ethereum wallet address
          </FormLabel>
          <FormControl
            type="text"
            name="wallet"
            id="contributor-wallet"
            value={values.wallet}
            oninput={actions.updateField}
          />
        </FormGroup>
        <StepActions>
          <Button variant="primary">Continue</Button>
        </StepActions>
      </form>
    </Step>
  )
);

// TODO: implement validation
function validate() {
  return {};
}

export default ContributorStep;
