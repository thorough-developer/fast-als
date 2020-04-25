let AsyncLocalStorage = require('async_hooks').AsyncLocalStorage;

let fastAls;

if (AsyncLocalStorage == null) {
    als = require('./cls-facade');
} else {
    console.log('als facade');
    als = require('./als-facade');
}

module.exports = fastAls;