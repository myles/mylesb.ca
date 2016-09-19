module.exports.register = function (Handlebars, options, params) {
  'use strict';

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
