module.exports = function (grunt) {
    var config = {
		target: {
			options: {
				'img-req-src': false,
				'id-class-style': false,
				'attr-name-style': false
			},
			src: [
				'source/partials/*.hbs',
				'source/layouts/*.hbs',
				'source/pages/*.hbs'
			]
		}
    };
    
    grunt.config.set('htmllint', config);
};
