"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.setValues = exports.setErrors = exports.reducer = exports.Form = void 0;

var _react = _interopRequireDefault(require("react"));

var _lodash = _interopRequireDefault(require("lodash"));

var _component = require("./component");

var _reducer2 = _interopRequireWildcard(require("./reducer"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var FormFactory =
/*#__PURE__*/
function () {
  function FormFactory() {
    _classCallCheck(this, FormFactory);
  }

  _createClass(FormFactory, [{
    key: "makeForm",
    value: function makeForm(config, Component) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var _options$mapStateToPr = options.mapStateToProps,
          mapStateToProps = _options$mapStateToPr === void 0 ? function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return args;
      } : _options$mapStateToPr,
          _options$mapDispatchT = options.mapDispatchToProps,
          mapDispatchToProps = _options$mapDispatchT === void 0 ? {} : _options$mapDispatchT,
          _options$mergeProps = options.mergeProps,
          mergeProps = _options$mergeProps === void 0 ? function () {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        return args;
      } : _options$mergeProps;
      var Connected = (0, _component.mergedConnect)(mapStateToProps, mapDispatchToProps, mergeProps, Component);
      return (
        /*#__PURE__*/
        function (_React$Component) {
          _inherits(Wrapper, _React$Component);

          function Wrapper(props) {
            var _this;

            _classCallCheck(this, Wrapper);

            _this = _possibleConstructorReturn(this, _getPrototypeOf(Wrapper).call(this, props));
            _this.formId = _lodash["default"].uniqueId('form-');
            return _this;
          }

          _createClass(Wrapper, [{
            key: "render",
            value: function render() {
              return _react["default"].createElement(Connected, _extends({}, this.props, {
                formId: this.formId,
                config: config
              }));
            }
          }]);

          return Wrapper;
        }(_react["default"].Component)
      );
    }
  }]);

  return FormFactory;
}();

var Form = _component.Form;
exports.Form = Form;
var reducer = _reducer2["default"];
exports.reducer = reducer;
var setErrors = _reducer2.setErrors;
exports.setErrors = setErrors;
var setValues = _reducer2.setValues;
exports.setValues = setValues;

var _default = new FormFactory();

exports["default"] = _default;