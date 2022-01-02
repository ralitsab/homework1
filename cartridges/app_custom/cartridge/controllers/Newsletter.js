'use strict';

/**
 * @namespace Newsletter
 */

var server = require('server');

var csrfProtection = require('*/cartridge/scripts/middleware/csrf');
var userLoggedIn = require('*/cartridge/scripts/middleware/userLoggedIn');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');

/**
 * Checks if the email value entered is correct format
 * @param {string} email - email string to check if valid
 * @returns {boolean} Whether email is valid
 */
function validateEmail(email) {
    var regex = /^[\w.%+-]+@[\w.-]+\.[\w]{2,6}$/;
    return regex.test(email);
}

server.get(
    'Show',
    server.middleware.https,
    csrfProtection.generateToken,
    consentTracking.consent,
    function (req, res, next) {
        var newsletterForm = server.forms.getForm('newsletter');
        newsletterForm.clear();
        res.render('account/newsletter', {
            newsletterForm: newsletterForm,
        });
        next();
    }
);

/**
 * Account-SaveProfile : The Account-SaveProfile endpoint is the endpoint that gets hit when a shopper has edited their profile
 * @name Base/Account-SaveProfile
 * @function
 * @memberof Account
 * @param {middleware} - server.middleware.https
 * @param {middleware} - csrfProtection.validateAjaxRequest
 * @param {httpparameter} - dwfrm_profile_customer_firstname - Input field for the shoppers's first name
 * @param {httpparameter} - dwfrm_profile_customer_lastname - Input field for the shopper's last name
 * @param {httpparameter} - dwfrm_profile_customer_phone - Input field for the shopper's phone number
 * @param {httpparameter} - dwfrm_profile_customer_email - Input field for the shopper's email address
 * @param {httpparameter} - dwfrm_profile_customer_emailconfirm - Input field for the shopper's email address
 * @param {httpparameter} - dwfrm_profile_login_password  - Input field for the shopper's password
 * @param {httpparameter} - csrf_token - hidden input field CSRF token
 * @param {category} - sensititve
 * @param {returns} - json
 * @param {serverfunction} - post
 */
server.post(
    'Save',
    server.middleware.https,
    csrfProtection.validateAjaxRequest,
    function (req, res, next) {
        var CustomObjectMgr = require('dw/object/CustomObjectMgr');
        var newsletterForm = server.forms.getForm('newsletter');
        var Resource = require('dw/web/Resources')
        var Transaction = require('dw/system/Transaction');
        var NEWSLETTER_CUSTOM_C = "NEWSLETTER_CUSTOM";
        var URLUtils = require('dw/web/URLUtils');


        var newsletterResult = CustomObjectMgr.getCustomObject("NEWSLETTER_CUSTOM_C");

        if (newsletterResult) {
            newsletterForm.valid = false;
            newsletter.email.error = Resource.msg("error.message.not.unique", 'forms', null)
        }
        if (newsletterForm.valid) {

            Transaction.wrap(function () {
                var newsletterEntry = CustomObjectMgr.createCustomObject("NEWSLETTER_CUSTOM_C")
                newsletterEntry.custom.gender = newsletterForm.gender.value;
                newsletterEntry.custom.email = newsletterForm.email.value;
                newsletterEntry.custom.firstname = newsletterForm.firstname.value;
                newsletterEntry.custom.lastname = newsletterForm.lastname.value;
            });
        }
        res.json({
            success: true,
            redirectUrl: URLUtils.url("Newsletter-Show").toString()
        })
        return next();
    }
);


module.exports = server.exports();
