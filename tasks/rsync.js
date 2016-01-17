module.exports = function (grunt) {
    'use strict';

    var config = {
		options: {
			args: ["--verbose"],
			recursive: true,
            exclude: ["*.scss"],
		},
		staging: {
			options: {
				src: "./build/",
				dest: "/srv/www/ca_mylesb_draft/html",
				host: "panda.mylesbraithwaite.com",
				port: 2222,
				user: "myles",
				delete: true
			}
		},
		production: {
			options: {
				src: "./build/",
				dest: "/srv/www/ca_mylesb_www/html",
				host: "panda.mylesbraithwaite.com",
				port: 2222,
				user: "myles",
				delete: true
			}
		},
        production_assets: {
            options: {
                src: "<%= config.source %>/assets/",
                dest: "/srv/www/ca_mylesb_www/html/assets",
				host: "panda.mylesbraithwaite.com",
				port: 2222,
				user: "myles"
            }
        },
        production_uploads: {
            options: {
                src: "<%= config.source %>/uploads/",
                dest: "/srv/www/ca_mylesb_www/html/uploads",
				host: "panda.mylesbraithwaite.com",
				port: 2222,
				user: "myles",
				delete: true
            }
        },
        production_favicon: {
            options: {
                src: "<%= config.source %>/assets/images/favicons/favicon.ico",
                dest: "/srv/www/ca_mylesb_www/html",
				host: "panda.mylesbraithwaite.com",
				port: 2222,
				user: "myles"
            }
        }
    };

    grunt.config.set('rsync', config);
};
