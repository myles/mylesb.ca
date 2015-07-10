module.exports = function (grunt) {
    var config = {
        server: {
            options: {
                port: 4000,
                hostname: "127.0.0.1",
                base: "build",
                livereload: true
            }
        }
    };
    
    grunt.config.set('connect', config);
};
