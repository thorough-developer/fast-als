const createNamespace = require('cls-hooked').createNamespace;
const hyperid = require('hyperid');
const generator = hyperid();
const id = generator();

const namespaceIdentifier = hyperid.decode(id).uuid;

const _namespace = createNamespace(namespaceIdentifier);

const als = {};

als.get = function (key) {
    if (_namespace.active) {
        return _namespace.get(key);
    }
    return undefined;
};

als.set = function (key, value) {
    if (_namespace.active) {
        _namespace.set(key, value);
    }
}
als.runWith = (defaults, callback) => {
    _namespace.run(() => {
        for (let [key, value] of Object.entries(defaults)) {
            _namespace.set(key, value);
        }
        callback();
    });
};

module.exports = als;