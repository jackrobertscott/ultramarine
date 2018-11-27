"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Theme = /** @class */ (function () {
    function Theme(config) {
        if (!config) {
            throw new Error('Expected config object to be given to constructor.');
        }
        this.config = config;
    }
    Theme.create = function (config) {
        return new Theme(config);
    };
    return Theme;
}());
exports.default = Theme;
