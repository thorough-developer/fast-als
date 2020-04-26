const { AsyncLocalStorage } = require('async_hooks');

/**
 * Asynchronous Local Storage wrapper that will run regardless of Node version.
 * 
 * @module fastAls
 */
let fastAls = {};

// these are just for documenting purposes

/**
 * The start of creating an asynchronous local storage context. Once this method is called, a new context is created
 * where get and set calls will set and return values as expected.
 * 
 * @memberof fastAls
 * @param {object} defaults - Sets the default values. A convenience so that you don't have to check to see if a value is there and set it to something else.
 * @param {fastAls~runWithCallback} callback - This is the code to be executed first within the new context that is created
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
 * });
*/
fastAls.runWith;

/**
 * Sets a variable for a given key within running context (started by runWith).
 * If this is called outside of a running context, it will not store the value.
 * @memberof fastAls
 * @param {string} key - the key to store the variable by
 * @param {any} value - the value to store under the key for lookup later on.
 * 
 * @example
 * 
 * const fastAls = require('fast-als');
 * 
 * function callInScope() {
 *   // override user
 *   fastAls.set('user', { id: 'overwrittenUser'});
 * }
 * 
 * fastAls.runWith({ user: { id: 'someUser' } }, () => {
 *   callInScope();
 * });
 * 
 * @example
 * 
 * const fastAls = require('fast-als');
 * 
 * function callOutOfScope() {
 *   // this never gets set
 *   fastAls.set('user', { id: 'overwrittenUser'});
 * }
 * 
 * // calling this won't store the variable under the key
 * callOutOfScope();
 */
fastAls.set;

/**
 * Gets a variable previously set within a running context (started by runWith).
 * If this is called outside of a running context, it will not retrieve the value.
 * 
 * @memberof fastAls
 * @param {string} key - the key to retrieve the stored value
 * 
 * @example
 * 
 * const fastAls = require('fast-als');
 * 
 * function callInScope() {
 *   // prints default user
 *   console.log(fastAls.get('user'));
 * }
 * 
 * fastAls.runWith({ user: { id: 'someUser' } }, () => {
 *   callInScope();
 * });
 * 
 * @example
 * 
 * const fastAls = require('fast-als');
 * 
 * function callInScope() {
 *   // prints default user
 *   console.log(fastAls.get('user'));
 * }
 * 
 * fastAls.runWith({ user: { id: 'someUser' } }, () => {
 *   callInScope();
 * });
 * 
 * // calling this will return undefined
 * callInScope();
 */
fastAls.get;

if (AsyncLocalStorage == null) {
    fastAls = require('./cls-facade');
} else {
    fastAls = require('./als-facade');
}

module.exports = fastAls;

/**
 * The code to be executed after the new asynchronous local storage context is created.
 * 
 * @callback fastAls~runWithCallback
 */