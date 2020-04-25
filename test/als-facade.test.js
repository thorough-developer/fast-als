const fastAls = require('../als-facade');

jest.mock('async_hooks', () => ({
    AsyncLocalStorage: class {
        store = undefined;

        getStore() {
            return this.store;
        }

        run(defaults, callback) {
            this.store = defaults;
            callback();
        }
    }
}));


describe('als-facade tests', () => {

    describe('When on Node 13 and higher', () => {

        beforeEach(() => {
            jest.restoreAllMocks();
        });

        describe('and set is called without running in context', () => {
            beforeEach(() => {
                fastAls.set('key', 'value');
            });

            it('then get returns undefined', () => {
                expect(fastAls.get('key')).toBeUndefined();
            });
        });

        describe('and defaults are used when running a context', () => {
            it('then the get returns the correct information', (done) => {
                fastAls.runWith({ key: 'value' }, () => {
                    expect(fastAls.get('key')).toBe('value');
                    done();
                });
            });
        })
        describe('and set is called within context', () => {
            it('then the get returns the correct information', (done) => {
                fastAls.runWith({}, () => {
                    fastAls.set('key', 'value');
                    expect(fastAls.get('key')).toBe('value');
                    done();
                });
            });
        });

    });
});