const gulp = require('gulp');
const sass = require('gulp-sass');
const sassBundler = require('gulp-sass-bundler');
const clean = require('gulp-clean');
const replace = require('gulp-replace');

const sassInput = './server/views/raw/sass';
const sassOutput = './server/views/raw/sass/bundle';
const output = './server/public/styles/bundle';
var hash = '';

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'compressed'
};

gulp.task('sass', ['clean-sass', 'clean-css', 'bundle-sass', 'templates'], function () {
  return gulp
    .src('./server/views/raw/sass/bundle/*.scss')
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(gulp.dest(output));
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
  return gulp.src(`${output}/*`, {read: false})
    .pipe(clean());
});

gulp.task('templates', function () {
  gulp.src(['./server/views/layout/styles.pug'])
    .pipe(replace(/bundle.[0-9]{1,10}.css/, `bundle.${hash}.css`))
    .pipe(gulp.dest('./server/views/layout'));
});
