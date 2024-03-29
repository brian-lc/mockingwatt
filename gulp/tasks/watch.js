/* Notes:
   - gulp/tasks/browserify.js handles js recompiling with watchify
   - gulp/tasks/browserSync.js watches and reloads compiled files
*/

var gulp = require('gulp');
var server = require('gulp-express');

gulp.task('watch', ['setWatch', 'browserSync'], function() {
	server.run({
	    file: 'server.js'
	});
  gulp.watch('src/css/**', ['css']);
  gulp.watch('src/images/**', ['images']);
  gulp.watch('src/htdocs/**', ['markup']);
});
