module.exports = function (grunt) {
    var config = {
        options: {
            stripBanners: true
        },
        dist: {
            src: [
                'bower_components/jquery/dist/jquery.min.js',
                'bower_components/concise/dist/js/concise.min.js',
                'bower_components/svg-injector/dist/svg-injector.min.js'
            ],
            dest: 'build/assets/javascript/vendor.js'
        }
    };
    
    grunt.config.set('concat', config);
};