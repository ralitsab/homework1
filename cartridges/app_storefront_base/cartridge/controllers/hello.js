'use strict'
@namespace Hello
var server = require('server');
server.post('Hello world', function (req, res, next) {
    res.json({
        message: "Hello world"
    })
    next();
});