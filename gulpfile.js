const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const merge = require('gulp-merge');
const minify = require('gulp-minify-css');
const browserSync = require('browser-sync').create();

const dist = './dist/';

// Merge SCSS / CSS, min, and inject into the sync browser
gulp.task('stylesheets', () => {
  const cssStream = gulp.src('./stylesheets/lib/**/*.css');
  const sassStream = gulp.src('./stylesheets/**/*.scss').pipe(sass());

  return merge(cssStream, sassStream)
    .pipe(concat('style.css'))
    .pipe(minify())
    .pipe(gulp.dest(dist))
    .pipe(browserSync.stream());
});

// Concat JS
gulp.task('scripts', () => {
  return gulp.src('./scripts/**/*.js')
    .pipe(concat('build.js'))
    .pipe(gulp.dest(dist));
});

// Bundle JS + CSS as one file
gulp.task('build', ['stylesheets', 'scripts']);

// Serve files on localhost with browserSync
gulp.task('serve', ['build'], () => {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  
  gulp.watch('./stylesheets/style.scss', ['stylesheets']);
  gulp.watch('index.html').on('change', browserSync.reload);
});

gulp.task('default', ['serve']);
