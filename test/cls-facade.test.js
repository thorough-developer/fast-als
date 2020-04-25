
const fastAls = require('../cls-facade');

jest.mock('cls-hooked', () => ({
    createNamespace: jest.fn(() => ({
        store: new Map(),
        active: undefined,
        get(key) {
            return this.store.get(key);
        },
        set(key, value) {
            return this.store.set(key, value);
        },
        run(callback) {
            this.active = this;
            callback();
        }
    }))
}));

describe('cls-facade tests', () => {
  describe('When on Node 12 and lower', () => {

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