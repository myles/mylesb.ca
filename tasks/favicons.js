module.exports = function (grunt) {
  var config = {
    options: {
      trueColor: true,
      precomposed: true,
      appleTouchBackgroundColor: "#ff5173",
      coast: true,
      windowsTile: true,
      tileBlackWhite: false,
      tileColor: "#ff5173",
      appleTouchPadding: 0,
      firefox: true,
      androidHomescree: true,
      html: 'source/templates/partials/favicons.hbs',
      HTMLPrefix: '/',
      indent: ''
    },
    icons: {
      src: 'source/assets/images/favicon.png',
      dest: 'build/'
    }
  };

  grunt.config.set('favicons', config);
};
