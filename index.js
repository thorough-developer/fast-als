let AsyncLocalStorage = require('async_hooks').AsyncLocalStorage;
let als;

if (AsyncLocalStorage == null) {
  als = require('./cls-facade');
} else {
 console.log('als facade');
 als = require('./als-facade');
}

module.exports = als;