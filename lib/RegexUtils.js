"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unescape = unescape;

function unescape(regexString) {
  return regexString.replace(/\\(.)/g, '$1');
}