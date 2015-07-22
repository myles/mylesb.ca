module.exports = function (grunt) {
    var config = {
		all: [ 'source/**/*.md' ]
	};
    
    grunt.config.set('mdlint', config);
};
