let AsyncLocalStorage = require('async_hooks').AsyncLocalStorage;
let als;

if (AsyncLocalStorage == null) {
  const createNamespace = require('cls-hooked').createNamespace;
  const hyperid = require('hyperid');
  const generator = hyperid();
  const id = generator();

  const namespaceIdentifier = hyperid.decode(id).uuid;
  
  const _namespace = createNamespace(namespaceIdentifier);
  als = {};
  als.get = function(key) {
    if (_namespace.active) {
      return _namespace.get(key);
    }
    return undefined;
  };  

  als.set = function(key, value){
    if (_namespace.active) {
      _namespace.set(key, value);
    }
  }
  als.runWith = ( defaults = {}, callback) => {
     _namespace.run(() => {
       for (let [key, value] of Object.entries(defaults)) {
        _namespace.set(key, value);
       }
       callback();
     });
   };
} else {
 als = new class AsyncLocalStorageFacade extends AsyncLocalStorage {
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
 }();
}

module.exports = als;