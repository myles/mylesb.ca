module.exports = function (grunt) {
    var config = {
        allFiles: [
            'source/assets/stylesheets/*.scss'
        ]
    };
    
    grunt.config.set('scsslint', config);
};
