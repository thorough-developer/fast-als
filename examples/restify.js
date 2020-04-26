const fastAls = require('../');

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