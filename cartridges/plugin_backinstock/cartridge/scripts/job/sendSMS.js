function sendSMS() {
    var CustomObjectMgr = require('dw/object/CustomObjectMgr');
    var ProductMgr = require('dw/catalog/ProductMgr');
    var twillio = require('*/cartridge/scripts/twillio/twillio');
    var objects = CustomObjectMgr.getAllCustomObjects('NotifyMeBackInStock');
    while (objects.hasNext()) {
        var object = objects.next();
        var pid = object.custom.productId;
        var product = ProductMgr.getProduct(pid);
        var instock = product.getAvailabilityModel()
            .isInStock();
        if (instock) {
            var numbers = object.custom.phoneNumbers.split(',');
            numbers.forEach(function (number) {
                var result = twillio.call({
                    To: number,
                    From: '+16073035452',
                    Body: 'Item is back in stock' + pid

                });
            });
        }
    }
}

module.exports = {
    sendSMS: sendSMS
};
