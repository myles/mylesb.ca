module.exports = function (grunt) {
    var config = {
        avatars: {
            options: {
                sizes: [
                    { width: 64 },
                    { width: 128 },
                    { width: 256 },
                    { width: 320 },
                    { width: 448 },
                    { width: 512 }
                ]
            },
            files: [{
                expand: true,
                cwd: 'source/assets/images/',
                src: ['avatars/**.png'],
                dest: 'build/assets/images/'
            }]
        },
        backgrounds_flickr: {
            options: {
                sizes: [{
                    aspectRatio: false,
                    name: 'square-75',
                    width: 75,
                    height: 75
                },{
                    aspectRatio: false,
                    name: 'square-150',
                    width: 150,
                    height: 150
                },{
                    aspectRatio: false,
                    name: 'thumbnail-100x75',
                    width: 100,
                    height: 75
                },{
                    name: 'small-240',
                    width: 240,
                    height: 240
                },{
                    name: 'small-320',
                    width: 320,
                    height: 320
                },{
                    name: 'medium-500',
                    width: 500,
                    height: 500
                },{
                    name: 'medium-640',
                    width: 640,
                    height: 640
                },{
                    name: 'medium-800',
                    width: 800,
                    height: 800
                },{
                    name: 'large-1024',
                    width: 1024,
                    height: 1024
                }]
            },
            files: [{
                expand: true,
                cwd: 'source/assets/images/',
                src: ['backgrounds/**.jpg'],
                dest: 'build/assets/images/'
            }]
        },
        backgrounds: {
            options: {
                sizes: [
                    { width: 320 },
                    { width: 480 },
                    { width: 768 },
                    { width: 1024 },
                    { width: 1280 }
                ]
            },
            files: [{
                expand: true,
                cwd: 'source/assets/images/',
                src: ['backgrounds/**.jpg'],
                dest: 'build/assets/images/'
            }]
        }
    };
    
    grunt.config.set('responsive_images', config);
};
