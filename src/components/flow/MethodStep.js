import { h } from 'hyperapp';
import Step from './Step';
import Button from '../common/Button';

const MethodStep = ({ onNextStep }) => (
  <Step title="Select contribution method">
    <Button onclick={onNextStep}>Ethereum <span>ETH</span></Button>
    <Button onclick={onNextStep}>Bitcoin <span>BTC</span></Button>
    <Button onclick={onNextStep}>Bitcoin Cash <span>BCH</span></Button>
    <Button onclick={onNextStep}>Litecoin <span>LTC</span></Button>
  </Step>
);

export default MethodStep;
