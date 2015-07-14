module.exports = function (grunt) {
    var config = {
        dist: {
            options: {
                sourceMap: true
            },
            files: {
                'build/assets/javascript/vendor.js': [
                    'bower_components/jquery/dist/jquery.min.js',
                    'bower_components/imager.js/dist/Imager.min.js',
                    'bower_components/concise/dist/js/concise.min.js',
                    'bower_components/svg-injector/dist/svg-injector.min.js'
                ],
                'build/assets/javascript/application.js': [
                    'build/assets/javascript/application.js'
                ]
            }
        }
    };
    
    grunt.config.set('uglify', config);
};
