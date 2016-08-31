var gulp = require('gulp');
var gutil = require('gulp-util');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var html2js = require('gulp-html2js');
var usemin = require('gulp-usemin');
var jshint = require('gulp-jshint');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');

gulp.task('browser-sync', function() {
    var files = ['build/index.html', 'build/js', 'build/css'];
    browserSync.init(files, {
        server: {
            baseDir: "build"
        }
    });
});

gulp.task('copy:fonts', function () {
  gulp.src('bower_components/components-font-awesome/fonts/**/*').pipe(gulp.dest('src/main/resources/static/fonts')).on('error', gutil.log);
  gulp.src('bower_components/components-font-awesome/fonts/**/*').pipe(gulp.dest('target/classes/static/fonts')).on('error', gutil.log);

});


gulp.task('usemin', function() {
    gulp.src('webapp/*.html').pipe(usemin()).pipe(gulp.dest('src/main/resources/static/')).on('error', gutil.log);
    gulp.src('webapp/*.html').pipe(usemin()).pipe(gulp.dest('target/classes/static/')).on('error', gutil.log);
});

gulp.task('templates', function(){
    gulp.src(['webapp/**/*.html', '!webapp/index.html']).pipe(html2js('template.js', {
        adapter: 'angular',
        name: 'easy-order.template'
    })).pipe(gulp.dest('src/main/resources/static/js/'))
    .pipe(gulp.dest('target/classes/static/js/')).on('error', gutil.log);
});

gulp.task('scripts', function() {
    gulp.src('webapp/**/*.js').pipe(concat('script.js')).pipe(gulp.dest('src/main/resources/static/js/')).on('error', gutil.log);
    gulp.src('webapp/**/*.js').pipe(concat('script.js')).pipe(gulp.dest('target/classes/static/js/')).on('error', gutil.log);
});

gulp.task('jshint', function() {
    gulp.src('webapp/**/*.js')
			.pipe(jshint())
			.pipe(jshint.reporter('default')).on('error', gutil.log);
});

gulp.task('default', ['copy:fonts', 'usemin', 'templates', 'scripts', 'jshint', 'browser-sync'], function () {
  gulp.watch('webapp/index.html', ['usemin']);
	gulp.watch(['webapp/**/*.html', '!webapp/index.html'], ['templates']);
	gulp.watch('webapp/**/*.js', ['scripts']);
	gulp.watch('webapp/**/*.js', ['jshint']);
});

gulp.task('usemin-build', function() {
	gulp.src('build/index.html').pipe(gulp.dest('src/main/resources/static/')).on('error', gutil.log);
	gulp.src('build/js/*.js').pipe(uglify()).pipe(gulp.dest('src/main/resources/static/js/')).on('error', gutil.log);
	gulp.src('build/css/*.css').pipe(minifyCss()).pipe(gulp.dest('src/main/resources/static/css/')).on('error', gutil.log);
	gulp.src('webapp/assets/img/**/*').pipe(gulp.dest('src/main/resources/static/assets/img/')).on('error', gutil.log);
})

gulp.task('build', ['usemin', 'templates', 'scripts', 'usemin-build']);
