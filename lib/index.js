"use strict";

var _ReverseRegex = _interopRequireDefault(require("./ReverseRegex"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reverseRegex = new _ReverseRegex.default('12\\(34\\)56(7\\(8\\))90');
console.log(reverseRegex.source);
console.log(reverseRegex.parts);
console.log(reverseRegex.captureGroupsAt);
console.log(reverseRegex.reinsert(['FOO']));
console.log(/12\)3/g instanceof RegExp);