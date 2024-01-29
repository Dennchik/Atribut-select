//* ----------------------------------------------------------------------------
window.addEventListener("keydown", function (e) {
	if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
		e.preventDefault();
	}
}, false);
//* ----------------------------------------------------------------------------
for (const dropdown of document.querySelectorAll(".select-wrapper")) {
	dropdown.addEventListener('click', function () {
		this.querySelector('.select').classList.toggle('open');
	});
}
for (const option of document.querySelectorAll(".select__list-item")) {
	option.addEventListener('click', function () {
		console.log(option);
		if (!this.classList.contains('_selected')) {
			this.parentNode.querySelector('.select__list-item._selected').classList.remove('_selected');
			this.classList.add('_selected');
			let buttons = document.getElementsByClassName('select__button');
			for (i = 0; i < buttons.length; i++) {
				buttons[i].value = this.innerText;

			};
			const selects = document.querySelectorAll('.select__list-item._selected');
			for (let i = 0; i < selects.length; i++) {
				const el = selects[i];
				// console.log(el);

			}
			// this.closest('.select').querySelector('input').value = this.textContent;
		}
	});
}

const itsSelect = document.querySelectorAll('[data-select]');
if (itsSelect) {
	itsSelect.forEach(select => {
		const dropDownList = select.querySelector('.select__list');
		const listItems = dropDownList.querySelectorAll('.select__list-item');
		let start = listItems[0];

		document.addEventListener('keydown', function (e) {
			e = e || window.e;
			target = e.target;
			if (e.key == 'ArrowUp') {
				//* Arrow Up
				let sibling = start.previousElementSibling;
				selectNext(sibling);
			} else if (e.key == 'ArrowDown') {
				//* Arrow Down
				let sibling = start.nextElementSibling;
				selectNext(sibling);
			} else if (e.key == 'Enter') {
				//* Key Down----------------------------------------
				sibling = start;
				console.log(sibling, 'sibling');
				selectVal();
			}
		});

		function selectVal() {
			let buttons = document.getElementsByClassName('select__button');
			for (i = 0; i < buttons.length; i++) {
				console.log(start.innerText);
				buttons[i].value = start.innerText;
			};
		}

		function selectNext(sibling) {
			if (sibling !== null) {
				start.focus();
				start.classList.remove('_selected');
				sibling.focus();
				sibling.classList.add('_selected');
				start = sibling;
			}
		}
	});
}

//todo Нажатие на Tab или Escape. Закрыть дропдаун;
//todo Клик снаружи дропдауна. Закрыть дропдаун;
let event_list = ['click', 'keydown'];
event_list.forEach(function (event) {
	window.addEventListener(event, function (e) {
		switch (true) {
			case e.key == 'ArrowDown':
				break;
			case e.key == 'ArrowUp':
				break;
			default:
				_viewClose(e);;
				break;
		}
	});
});

// //todo Переключатель классов
function _viewClose(e) {
	for (const select of document.querySelectorAll('.select')) {
		if (!select.contains(e.target)) {
			select.classList.remove('open');
		}
	}
}
// -----------------------------------------------------------------------------
listItems.forEach(function (listItem, index) {

	listItem.addEventListener('click', function (e) {
		let currentList = index;
		selectButton.value = listItem.textContent;
		const el_selected = itsSelect.querySelector('._selected');
		_listItem(listItem);
		if (el_selected && el_selected !== listItem) {
			_listItem(el_selected);
		}
		//* ----------------------------------------------------------------
		selectValue();
		console.log(currentList);
		_currentList(currentList);
	});
});