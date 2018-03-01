"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _arguments = arguments;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _colorFunctions = require("color-functions");

var _keyboard = require("@jworkshop/keyboard");

var _keyboard2 = _interopRequireDefault(_keyboard);

var _mouse = require("@jworkshop/mouse");

var _mouse2 = _interopRequireDefault(_mouse);

var _alpha = require("./alpha.png");

var _alpha2 = _interopRequireDefault(_alpha);

var _gradient = require("./gradient.png");

var _gradient2 = _interopRequireDefault(_gradient);

var _hue = require("./hue.png");

var _hue2 = _interopRequireDefault(_hue);

require("./style.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var random = Math.random;


var debounce = function debounce(method, wait, immediate) {
  var timeout = void 0;

  return function () {
    var context = undefined;
    var args = _arguments;

    var later = function later() {
      timeout = null;
      if (!immediate) {
        method.apply(context, args);
      }
    };

    var callNow = immediate && !timeout;

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) {
      method.apply(context, args);
    }
  };
};

var ColorPicker = function (_Component) {
  _inherits(ColorPicker, _Component);

  function ColorPicker(props) {
    _classCallCheck(this, ColorPicker);

    var _this = _possibleConstructorReturn(this, (ColorPicker.__proto__ || Object.getPrototypeOf(ColorPicker)).call(this, props));

    var color = props.color;
    var r = color.r,
        g = color.g,
        b = color.b,
        a = color.a;

    var _rgb2hsv = (0, _colorFunctions.rgb2hsv)(r, g, b),
        h = _rgb2hsv.h,
        s = _rgb2hsv.s,
        v = _rgb2hsv.v;

    s /= 100;
    v /= 100;

    var positionClassName = "bottom right";

    _this.state = { showDialog: false, h: h, s: s, v: v, a: a, positionClassName: positionClassName };

    /* Add bindings to all event methods to secure scoping. */
    _this._valueMouseHandler = _this._valueMouseHandler.bind(_this);
    _this._valueKeyHandler = _this._valueKeyHandler.bind(_this);
    _this._hueMouseHandler = _this._hueMouseHandler.bind(_this);
    _this._hueKeyHandler = _this._hueKeyHandler.bind(_this);
    _this._alphaMouseHandler = _this._alphaMouseHandler.bind(_this);
    _this._alphaKeyHandler = _this._alphaKeyHandler.bind(_this);
    _this._showDialog = _this._showDialog.bind(_this);
    _this._hideDialog = _this._hideDialog.bind(_this);

    _this._scrollHandler = debounce(function () {
      return _this._updateDialogPosition();
    });
    return _this;
  }

  _createClass(ColorPicker, [{
    key: "_isWithinComponent",
    value: function _isWithinComponent(element) {
      var node = element;

      while (node !== null) {
        if (node === this.colorPicker) {
          return true;
        }

        node = node.parentNode;
      }

      return false;
    }
  }, {
    key: "_addListeners",
    value: function _addListeners(component, handler, keyHandler) {
      component.mouse = new _mouse2.default(component);
      component.keyboard = new _keyboard2.default(component);

      component.mouse.onDrag(handler);
      component.mouse.onMouseDown(handler);
      component.keyboard.onKeyDown(keyHandler);
    }
  }, {
    key: "_removeListeners",
    value: function _removeListeners(component) {
      component.mouse.detach();
      component.keyboard.detach();
    }
  }, {
    key: "_valueMouseHandler",
    value: function _valueMouseHandler(event) {
      var boardOverlay = this.boardOverlay,
          state = this.state;
      var h = state.h,
          a = state.a;
      var _event$mouse = event.mouse,
          isLeftButton = _event$mouse.isLeftButton,
          position = _event$mouse.position;


      if (isLeftButton === true) {
        var x = position.x,
            y = position.y;
        var width = boardOverlay.offsetWidth,
            height = boardOverlay.offsetHeight;


        var s = Math.max(0, Math.min(width, x)) / width;
        var v = 1 - Math.max(0, Math.min(height, y)) / height;

        this._changeColor(h, s, v, a);
      }
    }
  }, {
    key: "_valueKeyHandler",
    value: function _valueKeyHandler(event) {
      var _state = this.state,
          h = _state.h,
          s = _state.s,
          v = _state.v,
          a = _state.a;
      var keyboard = event.keyboard;


      if (keyboard.hasKeyPressed(_keyboard.Keys.UP)) {
        v = Math.max(0, Math.min(1, v + 0.01));
      } else if (keyboard.hasKeyPressed(_keyboard.Keys.DOWN)) {
        v = Math.max(0, Math.min(1, v - 0.01));
      }
      if (keyboard.hasKeyPressed(_keyboard.Keys.LEFT)) {
        s = Math.max(0, Math.min(1, s - 0.01));
      } else if (keyboard.hasKeyPressed(_keyboard.Keys.RIGHT)) {
        s = Math.max(0, Math.min(1, s + 0.01));
      }

      this._changeColor(h, s, v, a);
    }
  }, {
    key: "_hueMouseHandler",
    value: function _hueMouseHandler(event) {
      var hueBanner = this.hueBanner,
          state = this.state;
      var s = state.s,
          v = state.v,
          a = state.a;
      var _event$mouse2 = event.mouse,
          isLeftButton = _event$mouse2.isLeftButton,
          position = _event$mouse2.position;


      if (isLeftButton === true) {
        var x = position.x;
        var width = hueBanner.offsetWidth;


        var h = (1 - Math.max(0, Math.min(width, x)) / width) * 360;

        this._changeColor(h, s, v, a);
      }
    }
  }, {
    key: "_hueKeyHandler",
    value: function _hueKeyHandler(event) {
      var _state2 = this.state,
          h = _state2.h,
          s = _state2.s,
          v = _state2.v,
          a = _state2.a;
      var keyboard = event.keyboard;


      if (keyboard.hasKeyPressed(_keyboard.Keys.LEFT)) {
        h = Math.max(0, Math.min(360, h + 3.6));
      } else if (keyboard.hasKeyPressed(_keyboard.Keys.RIGHT)) {
        h = Math.max(0, Math.min(360, h - 3.6));
      }

      this._changeColor(h, s, v, a);
    }
  }, {
    key: "_alphaMouseHandler",
    value: function _alphaMouseHandler(event) {
      var alphaBanner = this.alphaBanner,
          state = this.state;
      var h = state.h,
          s = state.s,
          v = state.v;
      var _event$mouse3 = event.mouse,
          isLeftButton = _event$mouse3.isLeftButton,
          position = _event$mouse3.position;


      if (isLeftButton === true) {
        var x = position.x;
        var width = alphaBanner.offsetWidth;


        var a = Math.max(0, Math.min(width, x)) / width;

        this._changeColor(h, s, v, a);
      }
    }
  }, {
    key: "_alphaKeyHandler",
    value: function _alphaKeyHandler(event) {
      var _state3 = this.state,
          h = _state3.h,
          s = _state3.s,
          v = _state3.v,
          a = _state3.a;
      var keyboard = event.keyboard;


      if (keyboard.hasKeyPressed(_keyboard.Keys.LEFT)) {
        a = Math.max(0, Math.min(1, a - 0.01));
      } else if (keyboard.hasKeyPressed(_keyboard.Keys.RIGHT)) {
        a = Math.max(0, Math.min(1, a + 0.01));
      }

      this._changeColor(h, s, v, a);
    }
  }, {
    key: "_updateDialogPosition",
    value: function _updateDialogPosition() {
      var colorPalette = this.colorPalette;
      var _props = this.props,
          dialogWidth = _props.dialogWidth,
          dialogHeight = _props.dialogHeight;

      var _colorPalette$getBoun = colorPalette.getBoundingClientRect(),
          bottom = _colorPalette$getBoun.bottom,
          left = _colorPalette$getBoun.left;

      var _document$documentEle = document.documentElement,
          clientWidth = _document$documentEle.clientWidth,
          clientHeight = _document$documentEle.clientHeight;


      var vertical = clientHeight - bottom > dialogHeight ? "bottom" : "top";
      var horizontal = clientWidth - left > dialogWidth ? "right" : "left";
      var positionClassName = vertical + " " + horizontal;

      this.setState({ positionClassName: positionClassName });
    }
  }, {
    key: "_showDialog",
    value: function _showDialog() {
      this._updateDialogPosition();
      this.setState({ showDialog: true });

      document.addEventListener("mousedown", this._hideDialog);
      document.addEventListener("scroll", this._scrollHandler);
    }
  }, {
    key: "_hideDialog",
    value: function _hideDialog(event) {
      if (!event || !this._isWithinComponent(event.target)) {
        this.setState({ showDialog: false });

        document.removeEventListener("mousedown", this._hideDialog);
        document.removeEventListener("scroll", this._scrollHandler);
      }
    }
  }, {
    key: "_changeColor",
    value: function _changeColor(h, s, v, a) {
      var onChange = this.props.onChange;

      var _hsv2rgb = (0, _colorFunctions.hsv2rgb)(h, s * 100, v * 100),
          r = _hsv2rgb.r,
          g = _hsv2rgb.g,
          b = _hsv2rgb.b;

      this.setState({ h: h, s: s, v: v, a: a });
      onChange({ r: r, b: b, g: g, a: a });
    }
  }, {
    key: "setColor",
    value: function setColor() {
      var r = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var g = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var b = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var a = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

      var _rgb2hsv2 = (0, _colorFunctions.rgb2hsv)(r, g, b),
          h = _rgb2hsv2.h,
          s = _rgb2hsv2.s,
          v = _rgb2hsv2.v;

      s /= 100;
      v /= 100;

      this.setState({ h: h, s: s, v: v, a: a });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var boardOverlay = this.boardOverlay,
          hueBanner = this.hueBanner,
          alphaBanner = this.alphaBanner,
          _valueMouseHandler = this._valueMouseHandler,
          _valueKeyHandler = this._valueKeyHandler,
          _hueMouseHandler = this._hueMouseHandler,
          _hueKeyHandler = this._hueKeyHandler,
          _alphaMouseHandler = this._alphaMouseHandler,
          _alphaKeyHandler = this._alphaKeyHandler;


      this._addListeners(boardOverlay, _valueMouseHandler, _valueKeyHandler);
      this._addListeners(hueBanner, _hueMouseHandler, _hueKeyHandler);
      this._addListeners(alphaBanner, _alphaMouseHandler, _alphaKeyHandler);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var boardOverlay = this.boardOverlay,
          hueBanner = this.hueBanner,
          alphaBanner = this.alphaBanner;


      this._removeListeners(boardOverlay);
      this._removeListeners(hueBanner);
      this._removeListeners(alphaBanner);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          className = _props2.className,
          style = _props2.style,
          paletteClassName = _props2.paletteClassName,
          paletteStyle = _props2.paletteStyle,
          dialogWidth = _props2.dialogWidth,
          dialogHeight = _props2.dialogHeight;
      var _state4 = this.state,
          showDialog = _state4.showDialog,
          h = _state4.h,
          s = _state4.s,
          v = _state4.v,
          a = _state4.a,
          positionClassName = _state4.positionClassName;

      var _hsv2rgb2 = (0, _colorFunctions.hsv2rgb)(h, 100, 100),
          hR = _hsv2rgb2.r,
          hG = _hsv2rgb2.g,
          hB = _hsv2rgb2.b;

      var _hsv2rgb3 = (0, _colorFunctions.hsv2rgb)(h, s * 100, v * 100),
          r = _hsv2rgb3.r,
          g = _hsv2rgb3.g,
          b = _hsv2rgb3.b;

      return _react2.default.createElement(
        "div",
        {
          ref: function ref(colorPicker) {
            return _this2.colorPicker = colorPicker;
          },
          className: (0, _classnames2.default)("color-picker", className),
          style: style
        },
        _react2.default.createElement("button", {
          ref: function ref(colorPalette) {
            return _this2.colorPalette = colorPalette;
          },
          className: (0, _classnames2.default)("color-palette", paletteClassName),
          style: Object.assign({ backgroundColor: "rgba(" + r + ", " + g + ", " + b + ", " + a + ")" }, paletteStyle),
          onClick: function onClick() {
            return showDialog ? _this2._hideDialog() : _this2._showDialog();
          }
        }),
        _react2.default.createElement(
          "div",
          {
            className: (0, _classnames2.default)("color-picker-dialog", { show: showDialog }, positionClassName),
            style: showDialog ? { width: dialogWidth, height: dialogHeight } : {}
          },
          _react2.default.createElement(
            "div",
            { className: "color-picker-panel" },
            _react2.default.createElement(
              "div",
              {
                className: "color-board",
                style: { backgroundColor: "rgb(" + hR + ", " + hG + ", " + hB + ")" }
              },
              _react2.default.createElement(
                "div",
                {
                  className: "color-board-gradient",
                  style: { backgroundImage: "url(" + _gradient2.default + ")" }
                },
                _react2.default.createElement("div", {
                  className: "color-board-pointer",
                  style: {
                    top: (1 - v) * 100 + "%",
                    left: s * 100 + "%"
                  }
                })
              ),
              _react2.default.createElement("button", {
                ref: function ref(boardOverlay) {
                  return _this2.boardOverlay = boardOverlay;
                },
                className: "color-board-overlay"
              })
            ),
            _react2.default.createElement(
              "button",
              {
                ref: function ref(hueBanner) {
                  return _this2.hueBanner = hueBanner;
                },
                className: "hue-banner",
                style: { backgroundImage: "url(" + _hue2.default + ")" }
              },
              _react2.default.createElement("div", {
                className: "thumb",
                style: { left: (1 - h / 360) * 100 + "%" }
              })
            ),
            _react2.default.createElement(
              "button",
              {
                ref: function ref(alphaBanner) {
                  return _this2.alphaBanner = alphaBanner;
                },
                className: "alpha-banner",
                style: { backgroundImage: "url(" + _alpha2.default + ")" }
              },
              _react2.default.createElement("div", {
                className: "alpha-banner-overlay",
                style: {
                  background: "linear-gradient(to right, transparent, rgb(" + r + ", " + g + ", " + b + "))"
                }
              }),
              _react2.default.createElement("div", { className: "thumb", style: { left: a * 100 + "%" } })
            )
          )
        )
      );
    }
  }]);

  return ColorPicker;
}(_react.Component);

ColorPicker.propTypes = {
  className: _propTypes2.default.string,
  style: _propTypes2.default.shape(),
  paletteClassName: _propTypes2.default.string,
  paletteStyle: _propTypes2.default.shape(),
  dialogWidth: _propTypes2.default.number,
  dialogHeight: _propTypes2.default.number,
  color: _propTypes2.default.shape({
    r: _propTypes2.default.number,
    g: _propTypes2.default.number,
    b: _propTypes2.default.number,
    a: _propTypes2.default.number
  }),
  onChange: _propTypes2.default.func
};

ColorPicker.defaultProps = {
  className: "",
  style: {},
  paletteClassName: "",
  paletteStyle: {},
  dialogWidth: 200,
  dialogHeight: 190,
  color: {
    r: random() * 255,
    g: random() * 255,
    b: random() * 255,
    a: 1
  },
  onChange: function onChange() {}
};

exports.default = ColorPicker;