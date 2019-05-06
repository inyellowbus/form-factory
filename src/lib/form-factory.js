import React from 'react';
import _ from 'lodash';
import {mergedConnect, Form as _Form} from './component';
import _reducer from './reducer';

class FormFactory {
  makeForm(config, Component, options = {}) {
    const {
      mapStateToProps = (...args) => args,
      mapDispatchToProps = {},
      mergeProps = (...args) => args,
    } = options;

    const Connected = mergedConnect(
      mapStateToProps,
      mapDispatchToProps,
      mergeProps,
      Component,
    );

    return class Wrapper extends React.Component {
      constructor(props) {
        super(props);
        this.formId = _.uniqueId('form-');
      }
      render() {
        return <Connected {...this.props} formId={this.formId} config={config} />;
      }
    };
  }
}

export const Form = _Form;

export const reducer = _reducer;

export default new FormFactory();