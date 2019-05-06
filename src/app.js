import React from 'react';
import { Provider } from 'react-redux';
import formFactory, { Form } from './lib/form-factory';

class TestForm extends Form {
  renderContent() {
    const { fields } = this.props;
    return (
      <React.Fragment>
        { fields.name.label }
        <input {...fields.name.input} />
        { fields.category.label }
        <select {...fields.category.input}>
          <option value='one'>one</option>
          <option value='two'>two</option>
          <option value='three'>three</option>
        </select>
        { fields.check.label }
        <input {...fields.check.input} />
      </React.Fragment>
    )
  }
  onSubmit() {
    const { values } = this.props;
    console.log(values)
  }
}

class App extends React.Component {
  form = formFactory.makeForm(
    {
      name: { label: 'Name' },
      category: {
        label: 'category',
        defaultValue: 'three',
        input: {
          type: 'select',
        }
      },
      check: {
        label: 'check',
        defaultValue: false,
        input: {
          type: 'checkbox',
        }
      }
    },
    TestForm,
  )
  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <h1>Hello world</h1>
        <this.form />
      </Provider>
    );
  }
}

export default App;
