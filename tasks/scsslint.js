module.exports = function (grunt) {
    var config = {
        allFiles: [
            'source/assets/stylesheets/*.scss'
        ],
		options: {
			colorizeOutput: true
		}
    };
    
    grunt.config.set('scsslint', config);
};
