const gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    useref = require('gulp-useref'),
    uglify = require('gulp-uglify'),
    // pump = require('pump'),
    gulpIf = require('gulp-if'),
    uglifycss = require('gulp-uglifycss'),
    // imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    del = require('del'),
    runSequence = require('run-sequence');


gulp.task('sass', function(){
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(autoprefixer({
        browsers: ['last 3 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
        stream: true
    }))
});

gulp.task('watch', ['browserSync', 'sass'], function(){
  gulp.watch('app/scss/**/*.scss', ['sass']); 
  gulp.watch('app/*.html', browserSync.reload); 
  gulp.watch('app/js/**/*.js', browserSync.reload); 
})

gulp.task('browserSync', function() {
    browserSync.init({
      server: {
          baseDir: 'app'
      },
    })
});

gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    // Minifies only if it's a JavaScript file
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('css/*.css', uglifycss({
      "maxLineLen": 80,
      "uglyComments": true
    })
    ))
    .pipe(gulp.dest('dist'))
});

gulp.task('images', function(){
  return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
    // Caching images that ran through imagemin
    .pipe(cache(imagemin({
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'))
});

gulp.task('fonts', function() {
    return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('videos', function() {
    return gulp.src('app/videos/**/*')
    .pipe(gulp.dest('dist/videos'));
});


gulp.task('clean', function() {
    return del.sync('dist');
});

gulp.task('build', function (callback) {
    runSequence('clean', 
      ['sass', 'useref', 'images', 'fonts', 'videos'],
      callback
    )
});

gulp.task('default', function (callback) {
    runSequence(['sass','browserSync', 'watch'],
      callback
    )
})