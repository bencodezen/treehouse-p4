// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var uglifyCSS = require('gulp-uglifycss');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');

var browserSync = require('browser-sync').create();

// Serve
gulp.task('serve', function() {
  gulp.watch(["*.html", "css/**/*.css"]).on('change', browserSync.reload);
  gulp.watch('scss/**/*.scss', ['sass']);

  browserSync.init({
    server: {
        baseDir: "./"
    }
  });
});

// Generate Production Assets
gulp.task('dist', function() {
  // Prepare CSS for Production
  gulp.src('css/**/*.css')
    .pipe(uglifyCSS({
      "max-line-len": 80
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/css'));
});

// Lint Task
gulp.task('lint', function() {
  return gulp.src('js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Compile Sass and Autoprefix Styles
gulp.task('sass', function() {
  return gulp.src('scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('css'))
    .pipe(autoprefixer({
      browsers: ['last 3 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('css'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
  return gulp.src('js/*.js')
    .pipe(gulp.dest('dist'))
    .pipe(rename('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch('js/*.js', ['lint', 'scripts']);
  gulp.watch('scss/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);