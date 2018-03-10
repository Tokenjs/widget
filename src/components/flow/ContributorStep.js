import { h } from 'hyperapp';
import apiClient from '../../api';
import { withForm, required, email } from '../../services/forms';
import Step from './Step';
import StepActions from './StepActions';
import Button from '../common/Button';
import { FormGroup, FormLabel, FormControl, FormError } from '../forms';
import component from 'hyperapp-nestable';

const ContributorStep = component(
  ...withForm(
    {
      email: {
        initialValue: '',
        rules: [required, email],
      },
      wallet: {
        initialValue: '',
        rules: [required],
      },
    },
    {
      onNextStep: () => {},
    },
    {
      handleSubmit: values => ({ onNextStep }) => (
        apiClient().post('/contributions', {
          destinationWalletAddress: values.wallet,
          type: 'crypto',
          currency: 'ETH',
          data: {
            email: values.email,
          },
        })
          .then(onNextStep)
      ),
    }
  ),
  ({
    values, touched, errors, submitting,
  }, actions) => (
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
            onblur={actions.touchField}
            oninput={actions.updateField}
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
            onblur={actions.touchField}
            oninput={actions.updateField}
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
  )
);

export default ContributorStep;
