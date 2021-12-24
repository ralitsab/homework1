'use strict';

/**
 * @namespace starship
 */

var server = require('server');
var cache = require('*/cartridge/scripts/middleware/cache');

/**
 * Page-Include : This end point is triggered when content assets are embedded within a rendered page ( eg footer content)
 * @name Base/Page-Include
 * @function
 * @memberof Page
 * @param {middleware} - server.middleware.include
 * @param {middleware} - cache.applyDefaultCache
 */
server.get(
    'Show',
    server.middleware.include,
    function (req, res, next) {
        var starshipsApi = require('~/cartridge/scripts/services/starshipsApis')
        var starshipData = starshipsApi.call().object;

        res.render("starship", {
            data: starshipData
            
        })
        next()
    });

module.exports = server.exports();
