"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
function default_1(func) {
    return (req, res, next) => {
        func(req, res, next).catch((err) => next(err));
    };
}
