import { h } from 'preact';
import withForm, { required, email } from '../forms/withForm';
import Button from '../common/Button';
import Step from './Step';
import StepActions from './StepActions';
import { FormGroup, FormLabel, FormControl, FormError } from '../forms';

const SCHEMA = {
  email: {
    initialValue: '',
    rules: [required, email],
  },
  wallet: {
    initialValue: '',
    rules: [required],
  },
};

const ContributorStep = ({
  values, touched, errors, submitting, touchField, updateField, submitForm,
}) => (
  <Step title="Enter your details">
    <form noValidate onSubmit={submitForm}>
      <FormGroup>
        <FormLabel for="contributor-email">
          E-mail address
        </FormLabel>
        <FormControl
          type="email"
          name="email"
          id="contributor-email"
          value={values.email}
          onblur={touchField}
          oninput={updateField}
        />
        {(touched.email && errors.email) && (
          <FormError>{errors.email}</FormError>
        )}
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
          onblur={touchField}
          oninput={updateField}
        />
        {(touched.wallet && errors.wallet) && (
          <FormError>{errors.wallet}</FormError>
        )}
      </FormGroup>
      <StepActions>
        <Button variant="primary" disabled={submitting}>
          {submitting ? 'Submitting…' : 'Continue'}
        </Button>
      </StepActions>
    </form>
  </Step>
);

export default withForm(ContributorStep, SCHEMA);

