"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var eMailRX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var _default = {
  required: function required() {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return !_lodash["default"].isNil(value) && !!"".concat(value).trim();
  },
  cyrillic: function cyrillic() {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return !value || /^[а-я\-\s\d\[\]\(\)]*$/im.test("".concat(value));
  },
  latin: function latin() {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return !value || /^[a-z\-\s\d\[\]\(\)]*$/im.test("".concat(value));
  },
  birthday: function birthday() {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return new Date(value) < new Date() || value === '';
  },
  'mask-length': function maskLength() {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return value.length === value.replace(/_/g, '').length;
  },
  'e-mail': function eMail() {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return "".concat(value).search(eMailRX) !== -1;
  }
};
exports["default"] = _default;