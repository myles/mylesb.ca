var fs = require('fs'),
    path = require('path'),
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
    postcss = require('gulp-postcss'),
    remoteSrc = require('gulp-remote-src'),
    webpack = require('webpack-stream'),
    browserSync = require('browser-sync');

var reload = browserSync.reload;

var config = function() {
  var basePath = __dirname,
      sourcePath = path.join(basePath, 'source/'),
      buildPath = path.join(basePath, 'build/');

  return {
    basePath: basePath,
    sourcePath: sourcePath,
    buildPath: buildPath,
    nodeModulesPath: path.join(basePath, 'node_modules'),

    dataPath: path.join(sourcePath, 'data/'),
    fontsPath: path.join(sourcePath, 'fonts/'),
    iconsPath: path.join(sourcePath, 'icons/'),
    imagesPath: path.join(sourcePath, 'images/'),
    pagesPath: path.join(sourcePath, 'pages/'),
    scriptsPath: path.join(sourcePath, 'scripts/'),
    stylesPath: path.join(sourcePath, 'styles/'),
    uploadsPath: path.join(sourcePath, 'uploads/'),
  }
}

config = config();

// Assets
// ------
gulp.task('styles', function() {
  gulp.src(`${config.stylesPath}/style.scss`)
      .pipe(sass({includePaths: [config.nodeModulesPath]})
        .on('error', sass.logError)
      )
      .pipe(gulp.dest(`${config.buildPath}/assets/`))
      .pipe(reload({ stream: true }));
});

gulp.task('styles-post', function() {
  gulp.src(`${config.buildPath}/assets/style.css`)
      .pipe(postcss([
        require('postcss-uncss')({
          html: [`${config.buildPath}/**/*.html`],
          js: [`${config.buildPath}/assets/**/*.js`]
        }),
        require('cssnano')
      ]))
      .pipe(gulp.dest(`${config.buildPath}/assets/`))
});

gulp.task('scripts', function() {
  gulp.src(`${config.scriptsPath}/index.js`)
      .pipe(webpack())
      .pipe(rename({basename: 'script'}))
      .pipe(gulp.dest(`${config.buildPath}/assets/`))
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
    title: JSON.parse(fs.readFileSync(`${config.dataPath}/01-title.json`)),
    elsewhere: JSON.parse(
      fs.readFileSync(`${config.dataPath}/05-elsewhere.json`)
    )
  };
}

gulp.task('pages', function() {
  var dateFilter = require('nunjucks-date-filter');

  var manageEnvironment = function(environment) {
    environment.addFilter('date', dateFilter);
  };

  return gulp.src(['source/pages/*.njk'])
    .pipe(data(getData))
    .pipe(nunjucksRender({
      path: ['source/pages/'],
      manageEnv: manageEnvironment
    }))
    .pipe(htmltidy({
      doctype: 'html5',
      hideComments: true,
      indent: true,
      indentSpaces: 4,
      wrap: 80*100
    }))
    .pipe(rename({
      extname: '.html'
    }))
    .pipe(gulp.dest('build/'))
    .pipe(reload({
      stream: true
    }));
});

// Download Data
// -------------
gulp.task('downloadData', function() {
  remoteSrc(['feed.json'], {
    base: 'https://talks.mylesb.ca/'
  })
  .pipe(rename('07-talks.json'))
  .pipe(gulp.dest(config.dataPath))
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

// Icons
// -----
gulp.task('icons', function() {
  gulp.src(['source/icons/**/*'])
      .pipe(gulp.dest('build/'))
      .pipe(reload({ stream: true }));
});

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
    'uploads',
    'icons',
    'styles-post'
  ]
);

gulp.task('runServer', ['build'], function() {
  browserSync({
    server: {
      baseDir: config.buildPath
    }
  });

  gulp.watch(`${config.stylesPath}/**/*`, ['styles']);
  gulp.watch(`${config.scriptsPath}/**/*`, ['scripts']);
  gulp.watch(`${config.pagesPath}/**/*`, ['pages']);
});

gulp.task('default', ['build']);
