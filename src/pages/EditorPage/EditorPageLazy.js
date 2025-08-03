"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditorPageLazy = void 0;
var react_1 = require("react");
exports.EditorPageLazy = (0, react_1.lazy)(function () {
    return Promise.resolve().then(function () { return require('./EditorPage'); }).then(function (module) { return ({ default: module.EditorPage }); });
});
