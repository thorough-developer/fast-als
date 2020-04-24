const { AsyncLocalStorage } = require('async_hooks');

class AsyncLocalStorageFacade extends AsyncLocalStorage {
    constructor() {
        super();
    }

    runWith(defaults, callback) {
        this.run(new Map(Object.entries(defaults)), () => {
            callback();
        });
    }

    set(key, value) {
        const store = this.getStore();

        if (store != null) {
            store.set(key, value);
        }
    }

    get(key) {
        const store = this.getStore();

        return store != null ? store.get(key) : undefined;
    }
}

const als = new AsyncLocalStorageFacade();

module.exports = als;