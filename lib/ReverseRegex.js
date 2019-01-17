"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _RegexUtils = require("./RegexUtils");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ReverseRegex =
/*#__PURE__*/
function () {
  function ReverseRegex(regex) {
    _classCallCheck(this, ReverseRegex);

    if (regex instanceof RegExp) {
      regex = regex.source;
    } else if (typeof regex === 'string') {
      new RegExp(regex); // validate regex string
    } else {
      throw new Error('Argument must be RegExp or a string representing a regex');
    }

    regex = regex.replace(/^\^/, '').replace(/\$$/, '');
    this.source = regex;
    this.parts = [];
    this.captureGroupsAt = [];
    var last = 0;

    for (var i = 0; i < regex.length; i++) {
      var char = regex[i];

      if (char === '\\') {
        i++;
        continue;
      }

      if (char === '(') {
        if (i !== last) {
          this.parts.push((0, _RegexUtils.unescape)(regex.substring(last, i)));
        }

        var j = i + 1;

        while (j < regex.length && (regex[j] !== ')' || regex[j - 1] === '\\')) {
          if (regex[j] === '(' && regex[j - 1] !== '\\') {
            throw new Error('Nested capture groups are not supported');
          }

          j++;
        }

        if (j >= regex.length) {
          throw new Error('Unclosed parenthesis');
        }

        this.parts.push(regex.substring(i, j + 1));
        this.captureGroupsAt.push(this.parts.length - 1);
        i = j;
        last = i + 1;
      }
    }

    if (last < regex.length - 1) {
      this.parts.push((0, _RegexUtils.unescape)(regex.substring(last)));
    }
  }

  _createClass(ReverseRegex, [{
    key: "reinsert",
    value: function reinsert(args) {
      if (args.length !== this.captureGroupsAt.length) {
        throw new Error('Insert count does not match capture group count');
      }

      var parts = this.parts.splice(0);

      for (var i = 0; i < args.length; i++) {
        parts[this.captureGroupsAt[i]] = args[i];
      }

      return parts.join('');
    }
  }]);

  return ReverseRegex;
}();

exports.default = ReverseRegex;
;