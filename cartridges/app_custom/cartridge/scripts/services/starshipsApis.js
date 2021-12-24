var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
var starships = LocalServiceRegistry.createService("starships", {
    createRequest: function(svc, params ) {
        svc.setURL(svc.getConfiguration().getCredential().getURL());
        svc.setRequestMethod('GET');
        svc.addHeader('Content-Type', 'application/json')
    },
    parseResponse: function(svc, output) {
        var x = output
        return JSON.parse(output.text)
    }
});

module.exports = starships