module.exports = function (grunt) {
    var config = {
        main: {
            expand: true,
            cwd: 'source/assets/images/',
            src: '**',
            dest: 'build/assets/images/',
            flatten: true
        },
        favicons: {
            expand: true,
            cwd: 'source/assets/images/',
            src: [
                'favicon.ico',
                'apple-touch-icon-precomposed.png'
            ],
            dest: 'build/',
            flatten: true
        }
    };
    
    grunt.config.set('copy', config);
};
