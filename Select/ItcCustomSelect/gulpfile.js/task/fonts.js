//* Обработка Fonts
const fonts = () => {
	return $.gulp.src($.path.fonts.src)
		.pipe($.gul.plumber({
			errorHandler: $.gul.notify.onError(error => ({
				title: 'Fonts',
				message: error.message,
			})),
		}))
		.pipe($.gul.newer($.path.fonts.dest))
		.pipe($.gul.fonter($.app.fonter))
		.pipe($.gul.debug({ title: 'FOUNTER' }))
		.pipe($.gulp.dest($.path.fonts.dest))
		.pipe($.gul.ttf2woff2())
		.pipe($.gul.debug({ title: 'TTF2woFF2' }))
		.pipe($.gulp.dest($.path.fonts.dest));
};
module.exports = fonts;