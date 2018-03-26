import { h, Component } from 'preact';

const withForm = (WrappedComponent, schema) => class extends Component {
  state = {
    ...getFormState({
      values: getInitialValues(schema),
    }, schema),
  };

  touchField = (event) => {
    const touched = {
      ...this.state.touched,
      [event.target.name]: true,
    };
    this.setState(getFormState({ ...this.state, touched }, schema));
  };

  updateField = (event) => {
    const values = {
      ...this.state.values,
      [event.target.name]: event.target.value,
    };
    this.setState(getFormState({ ...this.state, values }, schema));
  };

  submitForm = (event) => {
    const { values, valid } = this.state;

    event.preventDefault();

    const state = {
      touched: touchAllFields(schema),
      submitted: true,
      submitError: null,
    };

    if (!valid) {
      this.setState(state);
      return;
    }

    this.props.onSubmitted(values)
      .then(this.markAsSubmitSucceeded)
      .catch(this.markAsSubmitFailed);

    this.setState({
      ...state,
      submitting: true,
    });
  };

  markAsSubmitSucceeded = () => this.setState({ submitting: false });

  markAsSubmitFailed = err => this.setState({
    submitting: false,
    submitError: err.message,
  });

  render(props, state) {
    return (
      <WrappedComponent
        {...state}
        touchField={this.touchField}
        updateField={this.updateField}
        submitForm={this.submitForm}
        {...props}
      />
    );
  }
};

export default withForm;

// Validators

export const required = value => !value && 'Required';

export const email = value => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && 'Must be a valid e-mail address';

// Other

function getFormState({ values, touched, submitted }, schema) {
  const errors = validate(values, schema);
  return {
    values,
    touched: touched || {},
    errors,
    valid: !Object.values(errors).filter(error => error).length,
    submitted: submitted || false,
  };
}

function getInitialValues(schema) {
  return Object.keys(schema).reduce((result, key) => {
    result[key] = schema[key].initialValue;
    return result;
  }, {});
}

function touchAllFields(schema) {
  return Object.keys(schema).reduce((result, key) => {
    result[key] = true;
    return result;
  }, {});
}

function validate(values, schema) {
  return Object.keys(schema).reduce((errors, key) => {
    const value = values[key];
    errors[key] = schema[key].rules.reduce((error, rule) => {
      if (shouldSkipRule(rule, value)) {
        return error;
      }
      if (!error) {
        const errorMessage = rule(value);
        if (errorMessage) {
          return errorMessage;
        }
      }
      return error;
    }, null);
    return errors;
  }, {});
}

function shouldSkipRule(rule, value) {
  if (rule === required) {
    return false;
  }
  const hasValue = !required(value);
  return !hasValue;
}
