module.exports = function (grunt) {
    var config = {
        images: {
            expand: true,
            cwd: 'source/assets/images/',
            src: '**',
            dest: 'build/assets/images/'
        },
		fonts: {
			expand: true,
			cwd: 'source/assets/fonts/',
			src: '*.ttf',
			dest: 'build/assets/fonts/'
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
