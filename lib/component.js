"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.mergedConnect = exports.Form = void 0;

var _reactRedux = require("react-redux");

var _lodash = _interopRequireDefault(require("lodash"));

var _reducer = require("./reducer");

var _formMergeProps = require("./form-merge-props");

var _validation = _interopRequireDefault(require("./validation"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Form =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Form, _React$Component);

  function Form() {
    _classCallCheck(this, Form);

    return _possibleConstructorReturn(this, _getPrototypeOf(Form).apply(this, arguments));
  }

  _createClass(Form, [{
    key: "getChildContext",
    value: function getChildContext() {
      var formId = this.props.formId;
      return _objectSpread({}, this.context, {
        formId: formId
      });
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      var _this$props = this.props,
          createForm = _this$props.createForm,
          formId = _this$props.formId,
          fetch = _this$props.fetch;

      if (fetch) {
        fetch();
      }

      createForm(formId);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _this$props2 = this.props,
          removeForm = _this$props2.removeForm,
          formId = _this$props2.formId;
      removeForm(formId);
    }
  }, {
    key: "validation",
    value: function validation() {
      var _this$props3 = this.props,
          fields = _this$props3.fields,
          values = _this$props3.values,
          formId = _this$props3.formId,
          setErrors = _this$props3.setErrors;
      var errors = {};
      Object.keys(fields).forEach(function (k) {
        if (fields[k].validation) {
          fields[k].validation.forEach(function (validation) {
            if (!_validation["default"][validation](values[k])) {
              errors[k] = fields[k].errorText[validation];
            }
          });
        }
      });

      if (Object.keys(errors).length) {
        setErrors(formId, errors);
        return false;
      }

      setErrors(formId, {});
      return true;
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      return null;
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var className = this.props.className;
      return _react["default"].createElement("form", {
        className: className,
        onSubmit: function onSubmit(e) {
          e.preventDefault();

          if (_this.validation()) {
            _this.onSubmit();
          }
        }
      }, this.renderContent());
    }
  }]);

  return Form;
}(_react["default"].Component);

exports.Form = Form;

_defineProperty(Form, "childContextTypes", {
  formId: _propTypes["default"].string
});

var mapStateToProps = function mapStateToProps(state) {
  var ownProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var formId = ownProps.formId;
  var forms = state.toJS ? state.toJS().forms : state.forms;
  forms = forms.toJS ? forms.toJS() : forms;
  var values = {};
  var errors = {};

  if (!_lodash["default"].isEmpty(forms) && forms[formId] && forms[formId].values) {
    values = forms[formId].values;
    errors = forms[formId].errors;
  }

  var fields = ownProps.config;
  var name = ownProps.name;
  var id = ownProps.id;
  return {
    fields: fields,
    formId: formId,
    values: values,
    errors: errors,
    model: ownProps.model || {},
    name: name,
    id: id
  };
};

var setFormDisable = _reducer.ac.setFormDisable,
    createForm = _reducer.ac.createForm,
    removeForm = _reducer.ac.removeForm,
    setValues = _reducer.ac.setValues,
    clearValues = _reducer.ac.clearValues,
    setErrors = _reducer.ac.setErrors;
var mapDispatchToProps = {
  setFormDisable: setFormDisable,
  createForm: createForm,
  removeForm: removeForm,
  setValues: setValues,
  clearValues: clearValues,
  setErrors: setErrors
};

var mergedConnect = function mergedConnect() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return (0, _reactRedux.connect)(function (state, ownProps) {
    return _objectSpread({}, mapStateToProps(state, ownProps), args[0](state, ownProps));
  }, _objectSpread({}, mapDispatchToProps, args[1]), (0, _formMergeProps.mergeProps)(args[2]))(args[3]);
};

exports.mergedConnect = mergedConnect;

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Form);

exports["default"] = _default;