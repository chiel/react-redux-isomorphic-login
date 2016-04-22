'use strict';

const gulp = require('gulp');

/**
 * Symlink app into node_modules
 */
gulp.task('symlink', [ 'babel' ], () => {
	const symlink = require('gulp-symlink');

	const streams = [ 'app', 'server' ].map(dir => (
		gulp.src(`dist/${dir}`)
			.pipe(symlink(`node_modules/${dir}`, { force: true }))
	));

	return require('merge-stream')(streams);
});
