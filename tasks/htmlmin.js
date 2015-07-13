module.exports = function (grunt) {
    var config = {
        dist: {
            options: {
                removeComments: true,
                collapseWhitespace: true,
                maxLineLength: 70
            },
            files: {
                'build/index.html': 'build/index.html'
            }
        }
    };
    
    grunt.config.set('htmlmin', config);
};
