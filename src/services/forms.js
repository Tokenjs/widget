const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validation rules

export const required = value => !value && 'Required';

export const email = value => !EMAIL_PATTERN.test(value) && 'Must be a valid e-mail address';

// Other

export function withForm(schema, state, actions) {
  return [
    withFormState(state, schema),
    withFormActions(actions, schema),
  ];
}

function withFormState(state, schema) {
  const values = getInitialValues(schema);
  return getFormProps({ values }, schema);
}

function withFormActions(actions, schema) {
  return {
    ...actions,
    submitForm: event => ({ values, valid }, actions) => {
      event.preventDefault();

      const state = {
        touched: touchAllFields(schema),
        submitted: true,
        submitError: null,
      };

      if (!valid) {
        return state;
      }

      actions.handleSubmit(values)
        .then(actions.markAsSubmitSucceeded)
        .catch(actions.markAsSubmitFailed);

      return {
        ...state,
        submitting: true,
      };
    },
    markAsSubmitSucceeded: () => () => ({
      submitting: false,
    }),
    markAsSubmitFailed: err => () => ({
      submitting: false,
      submitError: err.message,
    }),
    touchField: event => ({ touched, ...state }) => {
      touched = {
        ...touched,
        [event.target.name]: true,
      };
      return getFormProps({ touched, ...state }, schema);
    },
    updateField: event => ({ values, ...state }) => {
      values = {
        ...values,
        [event.target.name]: event.target.value,
      };
      return getFormProps({ values, ...state }, schema);
    },
  };
}

function getFormProps({ values, touched, submitted }, schema) {
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
