//* Final assembly - Обработка Final
const final = () => {
	return $.gulp.src($.path.final.src)
		.pipe($.gul.size({ title: "Конечный размер файлов:" }))
		.pipe($.gulp.dest($.path.final.dest));
}
module.exports = final