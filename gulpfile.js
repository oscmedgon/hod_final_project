const gulp = require('gulp');
const sass = require('gulp-sass');
const sassBundler = require('gulp-sass-bundler');
const clean = require('gulp-clean');
const replace = require('gulp-replace');
const watch = require('gulp-watch');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const minify = require('gulp-minify');

const sassInput = './server/views/raw/sass';
const jsInput = './server/views/raw/scripts/bundle.js';
const sassOutput = './server/views/raw/bundle';
const cssOutput = './server/public/styles/bundle';
const jsOutput = './server/public/scripts';
var hash = '';

gulp.task('jsMin', ['clean-js', 'scripts-templates'], function () {
  gulp.src(jsInput)
    .pipe(minify({
      ext: {
        src: `.${hash}.debug.js`,
        min: `.${hash}.js`
      },
      exclude: ['tasks'],
      ignoreFiles: ['.combo.js', '-min.js']
    }))
    .pipe(gulp.dest(jsOutput));
});

gulp.task('clean-js', function () {
  return gulp.src(`${jsOutput}/*`, {read: false})
    .pipe(clean());
});

gulp.task('scripts-templates', function () {
  hash = Date.now() / 1000 | 0;
  gulp.src(['./server/views/layout/scripts.pug'])
    .pipe(replace(/bundle.[0-9]{1,10}.js/, `bundle.${hash}.js`))
    .pipe(gulp.dest('./server/views/layout'));
});


gulp.task('sass', ['clean-sass', 'clean-css', 'bundle-sass', 'styles-templates'], function () {
  const sassOptions = {
    errLogToConsole: true,
    outputStyle: 'compressed'
  };
  const autoprefixerOptions = {
    browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
  };
  return gulp
    .src('./server/views/raw/bundle/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(sourcemaps.write(`bundle.${hash}.map.css`))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest(cssOutput));
});

gulp.task('bundle-sass', function () {
  hash = Date.now() / 1000 | 0;
  sassBundler({
    dirs: [
      {path: `${sassInput}/loader.scss`, depth: -1}

    ],
    targetImportsFolder: sassOutput,
    targetImportsFile: `bundle.${hash}.scss`,
    debug: true
  });
});

gulp.task('clean-sass', function () {
  return gulp.src(`${sassOutput}/*`, {read: false})
    .pipe(clean());
});
gulp.task('clean-css', function () {
  return gulp.src(`${cssOutput}/*`, {read: false})
    .pipe(clean());
});

gulp.task('styles-templates', function () {
  gulp.src(['./server/views/layout/styles.pug'])
    .pipe(replace(/bundle.[0-9]{1,10}.css/, `bundle.${hash}.css`))
    .pipe(gulp.dest('./server/views/layout'));
});

gulp.task('watch', function () {
  gulp.watch(`${sassInput}/**/*.scss`, ['sass']);
  gulp.watch(jsInput, ['jsMin']);
});

gulp.task('prod', ['sass', 'jsMin']);
