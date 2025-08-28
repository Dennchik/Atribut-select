//* Сервер
const server = () => {
	$.browserSync.init({
		server: {
			baseDir: $.path.root
		},
		notify: false,
	});
};
module.exports = server;