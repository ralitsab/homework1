'use strict';

var server = require('server');
server.extend(module.superModule);

server.append('Show', function (req, res, next) {
     var HookMgr = require('dw/system/HookMgr');
     var viewData = res.getViewData()
     HookMgr.callHook("my.custom.hook", "addData", viewData) 
   viewData.customProperty = "Home"
   res.setViewData(viewData)
    next();
});

module.exports = server.exports();
