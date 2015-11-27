'use strict';

module.exports.register = function (Handlebars, options, params) {
    /**
     * {{trim}}
     * Remove whitespace before and after variable.
     * @param  {[type]} str [description]
     * @return {[type]}     [description]
     */
    Handlebars.registerHelper('trim', function (str) {
        if (str && typeof str === 'string') {
            return str.trim();
        }
    });
};
