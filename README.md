# fast-als
Asynchronous local storage implementation which provides an agnostic and performant approach no matter your version of node.

This package is a wrapper around both the populer cls-hooked library as well as the Node v13+  AsyncLocalStorage.

It will choose the right one to implement based on your version of Node.

This library is great for creating a thread local like implementation for your Hapi, Express, Koa, Fastify, or Hapi implementations to provide a 
local store per call. This library ensures that all values stored within a scope will only pertain to that scope. For instance
# Example

## Restify
```js
const fastAls = require('fast-als');

const restify = require('restify');

var server = restify.createServer();

server.pre(function(req, res, next) {
    fastAls.runWith({}, () => {
        fastAls.set('user', { id: 'myUser'});
        next();
    });
    return;
});

server.get('/', (req, res, next) => {
    res.send(fastAls.get('user'));
});

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
```
