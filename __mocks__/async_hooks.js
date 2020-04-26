const async_hooks = jest.genMockFromModule('async_hooks');

async_hooks.__setAsyncLocalStorage__ = function(als) {
    this.AsyncLocalStorage = als;
}

module.exports = async_hooks;