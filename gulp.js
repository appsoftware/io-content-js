var gulp = require('gulp');
var minify = require('gulp-minify');

// Log to console and file

var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/gulp.log', {flags : 'w'});
var log_stdout = process.stdout;

console.log = function(d) { 
  log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};

// Logging helper

logError = function(e, message) {
	
	console.log('\n----------------------');
	console.log(e);
	console.log('\n----------------------\n');
	console.log(message);
};

gulp.task('minify', function() {
	
	console.log('Running JS minification...')
	
	var doMinify = minify();
	
	doMinify.on('error', function(e){
		
		logError(e, 'JS minification failed (minify())');
	});
	
	gulp.src('src/*.js')
		.pipe(doMinify)
		.pipe(gulp.dest('dist'))
});

gulp.start('minify');
