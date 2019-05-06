import { connect } from 'react-redux';
import _ from 'lodash';

import { ac as acForms } from './reducer';
import { mergeProps } from './form-merge-props';

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

  renderContent() {
    return null;
  }

  render() {
    const {
      onSubmit,
    } = this.props;
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          this.onSubmit();
        }}>
        {this.renderContent()}
      </form>
    );
  }
}

const mapStateToProps = (state, ownProps = {}) => {
  const { formId } = ownProps;
  let forms = state.forms;
  forms = forms.toJS();
  let values;
  if (!_.isEmpty(forms) && forms[formId] && forms[formId].values) {
    values = forms[formId].values;
  }
  const fields = ownProps.config;
  const name = ownProps.name;
  const id = ownProps.id;
  return {
    isDisabled: forms.isDisabled,
    fields,
    formId,
    values: values || {},
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
