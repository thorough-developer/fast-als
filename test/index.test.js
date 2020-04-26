jest.mock('cls-hooked');
jest.mock('async_hooks');

const asyncHooks = require('async_hooks');

describe('fastAls tests', () => {
    let fastAls;

    beforeEach(() => {
        jest.resetModules();
        jest.resetAllMocks();
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });

    describe('when AsyncLocalStorage is not defined', () => {
        beforeEach(() => {
            require('async_hooks').__setAsyncLocalStorage__(undefined);
            fastAls = require('../');
        });

        it('then fastAls is defined', () => {
            expect(fastAls).toBeDefined();
        });
    });

    describe('when AsyncLocalStorage is defined', () => {
        beforeEach(() => {
            require('async_hooks').__setAsyncLocalStorage__(class {});
            fastAls = require('../');
        });

        it('then it is defined', () => {
            expect(fastAls).toBeDefined();
        });
    });
})