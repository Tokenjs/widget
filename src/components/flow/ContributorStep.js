import { h } from 'hyperapp';
import Step from './Step';
import Button from '../common/Button';
import { FormGroup, FormLabel, FormControl } from '../forms';

const ContributorStep = ({ onNextStep }) => (
  <Step
    title="Enter your details"
    renderAction={() => (
      <Button variant="primary" onclick={onNextStep}>Continue</Button>
    )}
  >
    <form noValidate>
      <FormGroup>
        <FormLabel for="contributor-email">
          E-mail address
        </FormLabel>
        <FormControl type="email" name="email" id="contributor-email" />
      </FormGroup>
      <FormGroup>
        <FormLabel for="contributor-wallet">
          Ethereum wallet address
        </FormLabel>
        <FormControl type="text" name="wallet" id="contributor-wallet" />
      </FormGroup>
    </form>
  </Step>
);

export default ContributorStep;
