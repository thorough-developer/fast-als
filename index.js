const { AsyncLocalStorage } = require('async_hooks');

let fastAls;

if (AsyncLocalStorage == null) {
    fastAls = require('./cls-facade');
} else {
    fastAls = require('./als-facade');
}

module.exports = fastAls;