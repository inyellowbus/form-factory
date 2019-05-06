import { connect } from 'react-redux';
import _ from 'lodash';

import { ac as acForms } from './reducer';
import { mergeProps } from './form-merge-props';
import validationRules from './validation';
import React from 'react';
import PropTypes from 'prop-types';

export class Form extends React.Component {
  static childContextTypes = {
    formId: PropTypes.string,
  }

  getChildContext() {
    const { formId } = this.props;
    return {
      ...this.context,
      formId,
    };
  }

  componentWillMount() {
    const {
      createForm,
      formId,
      fetch,
    } = this.props;
    if (fetch) {
      fetch();
    }
    createForm(formId);
  }

  componentWillUnmount() {
    const {
      removeForm,
      formId,
    } = this.props;
    removeForm(formId);
  }

  validation() {
    const { fields, values, formId, setErrors } = this.props;
    const errors = {};
    Object.keys(fields).forEach((k) => {
      if(fields[k].validation) {
        fields[k].validation.forEach((validation) => {
          if(!validationRules[validation](values[k])) {
            errors[k] = fields[k].errorText[validation];
          }
        });
      }
    });
    if(Object.keys(errors).length) {
      setErrors(formId, errors);
      return false;
    }
    setErrors(formId, {});
    return true;
  }

  renderContent() {
    return null;
  }

  render() {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if(this.validation()) {
            this.onSubmit();
          }
        }}>
        {this.renderContent()}
      </form>
    );
  }
}

const mapStateToProps = (state, ownProps = {}) => {
  const { formId } = ownProps;
  let forms = state.toJS ? state.toJS().forms : state.forms;
  forms = forms.toJS ? forms.toJS() : forms;
  let values = {};
  let errors = {};
  if (!_.isEmpty(forms) && forms[formId] && forms[formId].values) {
    values = forms[formId].values;
    errors = forms[formId].errors
  }
  const fields = ownProps.config;
  const name = ownProps.name;
  const id = ownProps.id;
  return {
    fields,
    formId,
    values,
    errors,
    model: ownProps.model || {},
    name,
    id,
  };
};

const {
  setFormDisable,
  createForm,
  removeForm,
  setValues,
  clearValues,
  setErrors,
} = acForms;

const mapDispatchToProps = {
  setFormDisable,
  createForm,
  removeForm,
  setValues,
  clearValues,
  setErrors,
};

export const mergedConnect = (...args) => {
  return connect(
    (state, ownProps) => ({
      ...mapStateToProps(state, ownProps),
      ...args[0](state, ownProps),
    }),
    { ...mapDispatchToProps, ...args[1] },
    mergeProps(args[2]),
  )(args[3]);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form);
