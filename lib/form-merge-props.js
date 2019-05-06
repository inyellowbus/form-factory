"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeProps = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var mergeProps = function mergeProps(_merge) {
  return function (sProps, dProps, oProps) {
    var _sProps$model = sProps.model,
        model = _sProps$model === void 0 ? {} : _sProps$model,
        _sProps$fields = sProps.fields,
        fields = _sProps$fields === void 0 ? {} : _sProps$fields,
        _sProps$errors = sProps.errors,
        errors = _sProps$errors === void 0 ? {} : _sProps$errors;
    var _sProps$values = sProps.values,
        values = _sProps$values === void 0 ? {} : _sProps$values;
    values = _objectSpread({}, model, values) || {};
    Object.keys(sProps.fields).forEach(function (el) {
      fields[el].error = errors[el];
      fields[el].input = fields[el].input || {
        type: 'text'
      };

      if (!values[el] && values[el] !== false) {
        values[el] = fields[el].defaultValue;
      }

      switch (fields[el].input.type) {
        case 'select':
          fields[el].input.value = values[el] || '';

          fields[el].input.onChange = function (e) {
            return dProps.setValues(oProps.formId, _defineProperty({}, el, e.target.value));
          };

          break;

        case 'checkbox':
          fields[el].input.onChange = function (e) {
            dProps.setValues(oProps.formId, _defineProperty({}, el, e.target.checked));
          };

          fields[el].input.checked = values[el] === false ? false : !!values[el];
          break;

        default:
          fields[el].input.value = values[el] || '';

          fields[el].input.onChange = function (e) {
            return dProps.setValues(oProps.formId, _defineProperty({}, el, e.target.value));
          };

      }
    });
    return _objectSpread({}, sProps, {
      model: model,
      fields: fields,
      errors: errors,
      values: values
    }, dProps, oProps, _merge(sProps, dProps, oProps) || {});
  };
};

exports.mergeProps = mergeProps;