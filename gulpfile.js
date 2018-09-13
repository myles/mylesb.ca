var fs = require('fs'),
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    nunjucksRender = require('gulp-nunjucks-render'),
    data = require('gulp-data'),
    rename = require('gulp-rename'),
    htmltidy = require('gulp-htmltidy'),
    exec = require('child_process').exec,
    each = require('gulp-each'),
    ttf2woff = require('gulp-ttf2woff'),
    svgmin = require('gulp-svgmin'),
    webpack = require('webpack-stream'),
    browserSync = require('browser-sync');

var reload = browserSync.reload;

// Assets
// ------
gulp.task('styles', function() {
  gulp.src('source/styles/style.scss')
      .pipe(sass({includePaths: ['node_modules/']})
        .on('error', sass.logError))
      .pipe(gulp.dest('build/assets/'))
      .pipe(reload({ stream: true }));
});

gulp.task('scripts', function() {
  gulp.src('source/scripts/index.js')
      .pipe(webpack())
      .pipe(rename({basename: 'script'}))
      .pipe(gulp.dest('build/assets/'))
      .pipe(reload({ stream: true }));
});

gulp.task('fonts', function() {
  gulp.src(['source/fonts/**/*.ttf'])
      .pipe(gulp.dest('build/assets/fonts'));

  gulp.src(['source/fonts/**/*.ttf'])
      .pipe(ttf2woff())
      .pipe(gulp.dest('build/assets/fonts/'));

  gulp.src('node_modules/@fortawesome/fontawesome-pro/webfonts/fa-*.+(eot|svg|ttf|woff|woff2)')
    .pipe(gulp.dest('build/assets/fonts/'));
});

gulp.task('svgImages', function() {
  gulp.src(['source/images/**/*.svg'])
      .pipe(svgmin())
      .pipe(gulp.dest('build/assets/img/'))
      .pipe(reload({ stream: true }));
});

gulp.task('images', ['svgImages'], function() {
  gulp.src('source/images/**/*.+(jpg|jpeg|gif|png)')
      .pipe(gulp.dest('build/assets/img/'))
      .pipe(reload({ stream: true }));
});

// Pages
// -----
function getData(file) {
  return {
    title: JSON.parse(fs.readFileSync('source/data/01-title.json')),
    elsewhere: JSON.parse(fs.readFileSync('source/data/05-elsewhere.json'))
  };
}

gulp.task('pages', function() {
  return gulp.src(['source/pages/*.njk'])
    .pipe(data(getData))
    .pipe(nunjucksRender({
      path: 'source/pages/'
    }))
    .pipe(htmltidy(
      {
        doctype: 'html5',
        hideComments: true,
        indent: true,
        indentSpaces: 4,
        wrap: 80*100
      }
    ))
    .pipe(rename(
      {
        extname: '.html'
      }
    ))
    .pipe(gulp.dest('build/'))
    .pipe(reload(
      {
        stream: true
      }
    ));
});

// Uploads
// -------
gulp.task('uploads', function() {
  gulp.src(['source/uploads/**/*'])
      .pipe(gulp.dest('build/uploads/'))
      .pipe(reload({ stream: true }));
});

var gpg_short_id = '0x5B423590',
    obsolete_gpg_short_id = ['0x5A2FE7BF'],
    work_gpg_short_id = '0x7E0205AA',
    bgi_gpg_short_id = '0x72C89F91';

var gpg_keys = obsolete_gpg_short_id.concat([
  gpg_short_id,
  work_gpg_short_id,
  bgi_gpg_short_id
]);

gulp.task('exportPublicKeys', function() {
  gpg_keys.forEach(function(gpg_key) {
    exec(`gpg --armor --export ${gpg_key} > source/uploads/${gpg_key}.asc`, function(err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
    });
  });
});

gulp.task('signSSHKeys', function() {
  gulp.src('source/uploads/myles-braithwaite-*.pub')
      .pipe(each(function(content, file, callback) {
        exec(`gpg --yes -u ${gpg_short_id} --clearsign ${file.path}`,
             function(err, stdout, stderr) {
          console.log(stdout);
          console.log(stderr);
        });
        callback(null);
      }));
  exec(`gpg --yes -u ${gpg_short_id} --clearsign source/uploads/ssh-key-fingerprints.txt`,
       function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
  });
});

gulp.task('signObsoleteProof', function() {
  obsolete_gpg_short_id.forEach(function(gpg_key) {
    exec(`gpg --clearsign -u ${gpg_key} -u ${gpg_short_id} source/uploads/obsolete-${gpg_key}-proof.txt`, function(err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
    });
  });
});

gulp.task('signProofOfIdentity', function() {
  exec(`gpg --yes -u ${gpg_short_id} --clearsign source/uploads/proof-of-identity.txt`,
       function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
  });

  console.log(`gpg --yes -u ${work_gpg_short_id} -u ${gpg_short_id} --clearsign source/uploads/proof-of-identity-work.txt`)

  exec(`gpg --yes -u ${work_gpg_short_id} -u ${gpg_short_id} --clearsign source/uploads/proof-of-identity-work.txt`,
       function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
  });

  console.log(`gpg --yes -u ${bgi_gpg_short_id} -u ${gpg_short_id} --clearsign source/uploads/proof-of-identity-braithwaite-network.txt`)
  exec(`gpg --yes -u ${bgi_gpg_short_id} -u ${gpg_short_id} --clearsign source/uploads/proof-of-identity-braithwaite-network.txt`,
       function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
  });
});

gulp.task(
  'processUploads',
  [
    'exportPublicKeys',
    'signSSHKeys',
    'signObsoleteProof',
    'signProofOfIdentity'
  ]
);

// Commands
// --------
gulp.task(
  'build',
  [
    'styles',
    'scripts',
    'fonts',
    'images',
    'pages',
    'uploads'
  ]
);

gulp.task('runServer', ['build'], function() {
  browserSync({
    server: {
      baseDir: 'build/'
    }
  });

  gulp.watch('source/**/*', ['build']);
});

gulp.task('default', ['build']);
