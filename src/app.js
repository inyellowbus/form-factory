import React from 'react';
import { Provider } from 'react-redux';
import formFactory, { Form } from './form-factory';

class TestForm extends Form {
  renderContent() {
    const { fields } = this.props;
    return (
      <React.Fragment>
        { fields.name.label }
        <input {...fields.name.input} />
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
    { name: { label: 'Name' } },
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
