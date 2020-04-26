# fast-als
Asynchronous local storage implementation which provides an agnostic and performant approach no matter your version of node.

This package is a wrapper around both the populer cls-hooked library as well as the Node v13+  AsyncLocalStorage.

It will choose the right one to implement based on your version of Node.

This library is great for creating a thread local like implementation for your Express, Koa, Fastify, or Restify implementations to provide a 
local store per call. This library ensures that all values stored within a scope will only pertain to that scope (scope creep in this instance is lethal 
to data integrity).

For instance, if you are using an ORM and you have some type of beforeHooks to save user information. You could try to save the calling user's 
information in some pre request handler by storing a value in a service to be used later by the hooks to save the proper user making the api call. However, if another user made
a simultaneous call, someone's info could/would be overwritten in this case. This library ensures that will not happen.

# Examples

The following examples show how this can be set up in some of the more familiar Node API frameworks.
These examples can be run from the [examples](./examples) directory.

## Fastify
```js
const fastAls = require('fast-als');

const fastify = require('fastify')({ logger: true })

fastify.addHook('onRequest', (req, reply, done) => {
    fastAls.runWith({
        user: { id: 'system' } // sets default values
    }, () => {
        done();
    });
});

fastify.addHook('preHandler', (req, reply, done) => {
    // overrides default user value
    fastAls.set('user', { id: 'fastifyUser' });
    done();
});

// Declare a route
fastify.get('/', async (request, reply) => {
    return {
        user: fastAls.get('user')
    }
});

// Run the server!
const start = async () => {
    try {
        await fastify.listen(3000);
        fastify.log.info(`server listening on ${fastify.server.address().port}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}
start();
```

## Express
```js
const fastAls = require('fast-als');

const express = require('express')
const app = express()
const port = 3000

app.use((req, res, next) => {
    fastAls.runWith({
        // overrides default user value
        user: { id: 'system' } // sets default values
    }, () => {
        next();
    });
});

app.use((req, res, next) => {
    fastAls.set('user', {
        id: 'expressUser'
    });
    next();
});

app.get('/', (req, res) => res.send({ user: fastAls.get('user') }))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
```

## Restify
```js
const fastAls = require('fast-als');

const restify = require('restify');

var server = restify.createServer();

server.pre(function (req, res, next) {
    fastAls.runWith({
        user: { id: 'system' } // sets default values
    }, () => {
        next();
    });
    return;
});

server.use(function (req, res, next) {
    // overrides default user value
    fastAls.set('user', { id: 'restifyUser' });
    next();
});

server.get('/', (req, res, next) => {
    res.send(fastAls.get('user'));
});

server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});
```
