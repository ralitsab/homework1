var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
var logger = require('dw/system/Logger').getLogger('twillio');
var twillio = LocalServiceRegistry.createService('twillio', {
    getRequestLogMessage: function (request) {
        logger.debug(request);
        return request;
    },
    getResponseLogMessage: function (response) {
        return response.text;
    },
    parseResponse: function (service, response) {
        return response;
    }
});

module.exports = twillio;
