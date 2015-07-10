module.exports = function (grunt) {
    var config = {
        main: {
            expand: true,
            cwd: 'source/assets/images/',
            src: '**',
            dest: 'build/assets/images/',
            flatten: true
        }
    };
    
    grunt.config.set('copy', config);
};
