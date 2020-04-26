const { AsyncLocalStorage } = require('async_hooks');

/**
 * 
 * @module fastAls
 */
let fastAls;

// these are just for documenting purposes

/**
 * @param {object} defaults - Sets the default values. A convenience so that you don't have to check to see if a value is there and set it to something else.
 * @param {function} callback - This is the code to be executed first within the new context that is created
 * 
 * @example
 * const fastAls = require('fast-als');
 * 
 * function firstCallInScope() {
 *   // override user
 *   fastAls.set('user', { id: 'overwrittenUser'});
 * }
 * 
 * function secondCallInScope() {
 *  // will print the user set in firstCallInScope
 *  console.log(fastAls.get('user'));
 * }
 * 
 * fastAls.runWith({ user: { id: 'someUser' } }, () => {
 *   firstCallInScope();
 *   secondCallInScope();
 * })
*/
fastAls.runWith;

fastAls.set;

fastAls.get;

if (AsyncLocalStorage == null) {
    fastAls = require('./cls-facade');
} else {
    fastAls = require('./als-facade');
}

module.exports = fastAls;