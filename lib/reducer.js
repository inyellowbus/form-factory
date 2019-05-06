"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ac = void 0;

var _immutable = require("immutable");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = (0, _immutable.fromJS)({
  isDisabled: false
});

var setFormDisable = function setFormDisable() {
  var isDisabled = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  return function (dispatch) {
    return dispatch({
      type: 'SET_FORM_DISABLE',
      payload: {
        isDisabled: isDisabled
      }
    });
  };
};

var createForm = function createForm(formId) {
  return function (dispatch) {
    return dispatch({
      type: 'CREATE_FORM',
      payload: {
        formId: formId
      }
    });
  };
};

var removeForm = function removeForm(formId) {
  return function (dispatch) {
    return dispatch({
      type: 'REMOVE_FORM',
      payload: {
        formId: formId
      }
    });
  };
};

var setValues = function setValues(formId, values) {
  return function (dispatch) {
    return dispatch({
      type: 'SET_FORM_VALUES',
      payload: {
        formId: formId,
        values: values
      }
    });
  };
};

var clearValues = function clearValues(formId) {
  return function (dispatch) {
    return dispatch({
      type: 'CLEAR_FORM_VALUES',
      payload: {
        formId: formId
      }
    });
  };
};

var setErrors = function setErrors(formId, errors) {
  return function (dispatch) {
    return dispatch({
      type: 'SET_FORM_ERRORS',
      payload: {
        formId: formId,
        errors: errors
      }
    });
  };
};

var ac = {
  setFormDisable: setFormDisable,
  createForm: createForm,
  removeForm: removeForm,
  setValues: setValues,
  clearValues: clearValues,
  setErrors: setErrors
};
exports.ac = ac;
var ACTION_HANDLERS = {
  SET_FORM_DISABLE: function SET_FORM_DISABLE(state, action) {
    var nextState = state.set('isDisabled', action.payload.isDisabled);
    return nextState;
  },
  CREATE_FORM: function CREATE_FORM(state, action) {
    var formId = action.payload.formId;
    var nextState = state.set(formId, (0, _immutable.fromJS)({
      id: formId,
      values: {},
      errors: {},
      status: ''
    }));
    return nextState;
  },
  REMOVE_FORM: function REMOVE_FORM(state, action) {
    var formId = action.payload.formId;
    var nextState = state["delete"](formId);
    return nextState;
  },
  SET_FORM_VALUES: function SET_FORM_VALUES(state, action) {
    var formId = action.payload.formId;
    var nextValues = action.payload.values;
    var values = state.getIn([formId, 'values']) ? state.getIn([formId, 'values']).toJS() : {};
    var nextState = state.setIn([formId, 'values'], (0, _immutable.fromJS)(_objectSpread({}, values, nextValues)));
    return nextState;
  },
  CLEAR_FORM_VALUES: function CLEAR_FORM_VALUES(state, action) {
    var formId = action.payload.formId;
    var nextState = state.setIn([formId, 'values'], (0, _immutable.fromJS)({}));
    return nextState;
  },
  SET_FORM_ERRORS: function SET_FORM_ERRORS(state, _ref) {
    var payload = _ref.payload;
    var formId = payload.formId;
    var nextErrors = payload.errors;
    var nextState = state.setIn([formId, 'errors'], (0, _immutable.fromJS)(nextErrors));
    return nextState;
  }
};

var _default = function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _immutable.fromJS)(initialState);
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};

exports["default"] = _default;