module.exports = function (grunt) {
    'use strict';

    var config = {
		options: {
			args: ["--verbose"],
			recursive: true
		},
		staging: {
			options: {
				src: "./build/",
				dest: "/srv/www/ca_mylesb_draft/html",
				host: "panda.mylesbraithwaite.com",
				port: 2222,
				user: "myles",
				delete: true // Careful this option could cause data loss, read the docs!
			}
		},
		production: {
			options: {
				src: "./build/",
				dest: "/srv/www/ca_mylesb_www/html",
				host: "panda.mylesbraithwaite.com",
				port: 2222,
				user: "myles",
				delete: true // Careful this option could cause data loss, read the docs!
			}
		}
    };

    grunt.config.set('rsync', config);
};
