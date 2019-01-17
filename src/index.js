import ReverseRegex from "./ReverseRegex";

const reverseRegex = new ReverseRegex('12\\(34\\)56(7\\(8\\))90');

console.log(reverseRegex.source);
console.log(reverseRegex.parts);
console.log(reverseRegex.captureGroupsAt);
console.log(reverseRegex.reinsert(['FOO']));
