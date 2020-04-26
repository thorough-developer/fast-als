const { AsyncLocalStorage } = require('async_hooks');

const asyncLocalStorage = new AsyncLocalStorage();

const als = {
    runWith: (defaults, callback) => {
        asyncLocalStorage.run(new Map(Object.entries(defaults)), () => {
            callback();
        });
    },
    set: (key, value) => {
        const store = asyncLocalStorage.getStore();

        if (store != null) {
            store.set(key, value);
        }
    },
    get: (key, value) => {
        const store = asyncLocalStorage.getStore();

        return store != null ? store.get(key) : undefined;
    }
}

module.exports = als;