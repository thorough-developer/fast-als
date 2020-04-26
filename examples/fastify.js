const fastAls = require('../');

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