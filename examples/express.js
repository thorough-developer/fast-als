const fastAls = require('../');

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