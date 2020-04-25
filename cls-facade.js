const createNamespace = require('cls-hooked').createNamespace;
const hyperid = require('hyperid');
const generator = hyperid();
const id = generator();

const namespaceIdentifier = hyperid.decode(id).uuid;

const _namespace = createNamespace(namespaceIdentifier);

const als = {
    get: (key) => {
        if (_namespace.active) {
            return _namespace.get(key);
        }
        return undefined;
    },
    set: (key, value) => {
        if (_namespace.active) {
            _namespace.set(key, value);
        }
    },
    runWith: (defaults, callback) => {
        // this ensures that a new "thread" is truly a new thread. 
        // cls expects new contexts to inherit from parents which I believe should be configurable or a bug.
        // _namespace.active = null;

        _namespace.run(() => {
            for (let [key, value] of Object.entries(defaults)) {
                _namespace.set(key, value);
            }
            callback();
        });
    }
};
module.exports = als;