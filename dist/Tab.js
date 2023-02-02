"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _antd = require("antd");
var _helpers = require("../../../../src/services/helpers");
require("./styles.css");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const {
  TabPane
} = _antd.Tabs;
class Tab extends _react.Component {
  componentDidMount() {
    if (this.props.component.params.className) {
      window[window.sessionStorage?.tabId][`${this.props.component.params.className}_activeKey`] = '1';
    }
  }
  componentWillUnmount() {
    if (this.props.component.params.className) {
      delete window[window.sessionStorage?.tabId][`${this.props.component.params.className}_activeKey`];
    }
  }
  render() {
    const {
      children
    } = this.props;
    const {
      tabs,
      tabPane,
      styles,
      className
    } = this.props.component.params;
    const childComponent = _react.default.Children && _react.default.Children.map(children, child => {
      if (children && children !== false) {
        return /*#__PURE__*/_react.default.cloneElement(child, {
          parentProps: this.props
        });
      }
    });
    const finalTabPanes = (0, _helpers.applyConditionalsToArray)(tabPane);
    function onTabClick(activeKey) {
      if (className) {
        window[window.sessionStorage?.tabId][`${className}_activeKey`] = activeKey;
        if (className === 'crp-payment-tabs') {
          window[window.sessionStorage?.tabId].setActiveKey && window[window.sessionStorage?.tabId].setActiveKey(activeKey);
        }
      }
    }
    const customDisplayTab = true;
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, customDisplayTab && /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("style", {
      dangerouslySetInnerHTML: {
        __html: styles
      }
    }), /*#__PURE__*/_react.default.createElement(_antd.Tabs, {
      forceRender: true,
      animated: tabs.animated || false,
      onTabClick: onTabClick,
      items: finalTabPanes && finalTabPanes.map((pane, index) => ({
        label: pane.title,
        key: pane.key,
        children: childComponent[index],
        forceRender,
        closable: pane.closable || false
      }))
    })));
  }
}
exports.default = Tab;
module.exports = exports.default;