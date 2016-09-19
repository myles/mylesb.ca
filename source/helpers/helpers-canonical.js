/*jslint todo: true */

module.exports.register = function (Handlebars, options, params) {
    'use strict';

    /**
     * {{canonical}}
     * @param  {String} dest
     * @return {String} url
     */
    Handlebars.registerHelper('canonical', function (dest) {
        /*
         * TODO Replace the hardcoded 'build' with the site.url variable.
         */
        var url = dest.replace('build', '').replace('index.html', '');
        return url;
    });
};
