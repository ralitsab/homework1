'use strict';

/**
 * @namespace Home
 */

var server = require('server');

server.post('Subscribe', function (req, res, next) {
    var CustomObjectMgr = require('dw/object/CustomObjectMgr');
    var Transaction = require('dw/system/Transaction');
    var form = server.forms.getForm('backInStock');
    var customObject = CustomObjectMgr.getCustomObject('NotifyMeBackInStock', form.pid.value);
    try {
        Transaction.wrap(function () {
            if (customObject) {
                customObject.custom.phoneNumbers.split(',').push(form.phone.value).join(',');
            } else {
                var newObject = CustomObjectMgr.createCustomObject('NotifyMeBackInStock', form.pid.value);
                newObject.custom.phoneNumbers = form.phone.value;
            }
        });
    } catch (e) {
        res.json({
            success: false
        });
        next();
    }

    res.json({
        success: true
    });
    next();
});

module.exports = server.exports();
