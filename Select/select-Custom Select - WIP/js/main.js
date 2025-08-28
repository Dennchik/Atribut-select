var $select = $('.js-select'),
	$dropdown = $('.js-dropdown'),
	$checkbox = $('input[type=checkbox]'),
	$icon = $('.js-icon'),
	isOpen = false;

var openSelection = function () {
	$dropdown.addClass('is-open');
	isOpen = true;
};

var closeSelection = function () {
	$dropdown.removeClass('is-open');
	isOpen = false;
};

$checkbox.on('click', function (e) {
	console.log('click');
});

$select.each(function (i, wrap) {
	var $wrap = $(wrap);

	$wrap.on('click', function () {
		isOpen ? closeSelection() : openSelection();
	});
});
const x = [1, 2, 3];
const y = [4, 5, 6];
console.log(x.concat(y)[1] * 2 + y.lenght);

const array1 = [1, 2, 3];

const array2 = [1, 2, 3];
console.log(array1 === array2);

const myArr = [10, 20, 30, 40, 50];
function multi(myAr) {
	for (let i = 0; i < array.length; i++) {

		array[i];
	}
}