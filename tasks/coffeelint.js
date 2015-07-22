module.exports = function (grunt) {
    var config = {
        app: ['source/assets/javascript/*.coffee']
    };
    
    grunt.config.set('coffeelint', config);
};
