//* Удаление директории - Public
const clear = () => {
	return $.del('./public')
}
module.exports = clear