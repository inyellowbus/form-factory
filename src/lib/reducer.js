import { fromJS } from 'immutable';

const initialState = fromJS({
  isDisabled: false,
});

const setFormDisable = (isDisabled = false) => dispatch => dispatch({
  type: 'SET_FORM_DISABLE',
  payload: { isDisabled },
});

const createForm = formId => dispatch => dispatch({
  type: 'CREATE_FORM',
  payload: { formId },
});

const removeForm = formId => dispatch => dispatch({
  type: 'REMOVE_FORM',
  payload: { formId },
});

const setValues = (formId, values) => dispatch => dispatch({
  type: 'SET_FORM_VALUES',
  payload: { formId, values },
});

const clearValues = formId => dispatch => dispatch({
  type: 'CLEAR_FORM_VALUES',
  payload: { formId },
});

const setErrors = (formId, errors) => dispatch => dispatch({
  type: 'SET_FORM_ERRORS',
  payload: { formId, errors },
});

export const ac = {
  setFormDisable,
  createForm,
  removeForm,
  setValues,
  clearValues,
  setErrors,
};

const ACTION_HANDLERS = {
  SET_FORM_DISABLE: (state, action) => {
    const nextState = state.set('isDisabled', action.payload.isDisabled);
    return nextState;
  },
  CREATE_FORM: (state, action) => {
    const formId = action.payload.formId;
    const nextState = state.set(formId, fromJS({ id: formId, values: {}, errors: {}, status: '' }));
    return nextState;
  },
  REMOVE_FORM: (state, action) => {
    const formId = action.payload.formId;
    const nextState = state.delete(formId);
    return nextState;
  },
  SET_FORM_VALUES: (state, action) => {
    const formId = action.payload.formId;
    const nextValues = action.payload.values;
    const values = state.getIn([formId, 'values']) ? state.getIn([formId, 'values']).toJS() : {};
    const nextState = state.setIn([formId, 'values'], fromJS({ ...values, ...nextValues }));
    return nextState;
  },
  CLEAR_FORM_VALUES: (state, action) => {
    const formId = action.payload.formId;
    const nextState = state.setIn([formId, 'values'], fromJS({}));
    return nextState;
  },
  SET_FORM_ERRORS: (state, { payload }) => {
    const formId = payload.formId;
    const nextErrors = payload.errors;
    const nextState = state.setIn([formId, 'errors'], fromJS(nextErrors));
    return nextState;
  },
};

export default (state = fromJS(initialState), action) => {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};
