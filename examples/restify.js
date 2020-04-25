const fastAls = require('../');

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