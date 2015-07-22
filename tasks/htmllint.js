module.exports = function (grunt) {
    var config = {
		target: {
			options: {
				'img-req-src': false,
				'id-class-style': false,
				'attr-name-style': false
			},
			src: [
				'source/**/*.hbs'
			]
		}
    };
    
    grunt.config.set('htmllint', config);
};
