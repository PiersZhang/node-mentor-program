'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    success: function success(info, data) {
        console.log('\uD83D\uDC8B\uD83D\uDC8B\uD83D\uDC8B' + (info || '') + ' success!!!, data is: \r\n' + (data || ''));
    },
    error: function error(info, data) {
        console.log('\u2757\uFE0F\u2757\uFE0F\u2757\uFE0F' + (info || '') + ' error!!!, data is: \r\n' + (data || ''));
    }
};