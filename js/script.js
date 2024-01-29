//* ------------------------------ [Select]-------------------------------------
document.querySelectorAll('[data-select]').forEach(function (selectGroup) {
	const itsSelects = selectGroup.querySelectorAll('.select');
	if (itsSelects) {
		itsSelects.forEach(itsSelect => {
			const listItems = itsSelect.querySelectorAll('.select__list-item');
			const selectButton = itsSelect.querySelector('.select__button');
			itsSelect.addEventListener('click', function (el) {
				target = el.target;
				if (target.closest('.select__button')) {
					const opened_select = document.querySelector('._active-collapse');
					_toggleOpen(itsSelect);
					if (el.target.closest('.select__box-button')) {
						start = el.target.closest('.select__box-button').nextElementSibling.querySelector('._selected');
					}
					if (!target.closest('.select').classList.contains('_active-collapse')) {
						selectButton.blur();
					}
					if (opened_select && opened_select !== itsSelect) {
						_toggleOpen(opened_select);
					}
				}
			});
			if (listItems.length !== 0) {
				var start = listItems[0];
				[].forEach.call(listItems, function (listItem) {
					listItem.addEventListener('click', function (e) {
						start = this;
						start.focus();
						selectButton.value = listItem.textContent;
						const el_selected = itsSelect.querySelector('._selected');
						_listItem(listItem);
						if (el_selected && el_selected !== listItem) {
							_listItem(el_selected);
						} else {
							// listItem.classList.add('_selected');
						}
						//* -------------------------------------------------
						selectValue();
					});
				});
				function selectValue() {
					let buttons = selectGroup.getElementsByClassName('select__button');
					for (i = 0; i < buttons.length; i++) {
						buttons[i].value = start.textContent;
						selectButton.blur();
					};
				}
				//todo Переключатель классов
				const _listItem = (el) => {
					const collapse = new ItcCollapse(el.closest('._collapse'));
					if (el.classList.contains('_selected')) {
						el.classList.remove('_selected');
						collapse.toggle();
						el.closest('.select').classList.remove('_active-collapse');
					} else {
						el.classList.add('_selected');
					}
				};
			}
			selectGroup.addEventListener('keydown', function (e) {
				e = e || window.e;
				e.preventDefault();
				target = e.target;
				if (e.key == 'ArrowUp') {
					//* Arrow Up -------------------------------------
					let sibling = start.previousElementSibling;
					selectNext(sibling);
				} else if (e.key == 'ArrowDown') {
					//* Arrow Down -----------------------------------
					let sibling = start.nextElementSibling;
					selectNext(sibling);
				} else if (e.key == 'Enter') {
					//* Key Enter ------------------------------------
					// sibling = e.target;
					selectValue();
					closeBos();
				}
			});
			// todo Переключение активного элемента и его выделение при изменении фокуса;
			function selectNext(sibling) {
				if (sibling !== null) {
					start.focus();
					start.classList.remove('_selected');
					sibling.focus();
					sibling.classList.add('_selected');
					start = sibling;
				}
			}
			//todo Переключатель классов
			const _toggleOpen = (el) => {
				const collapse = new ItcCollapse(el.closest('.select').querySelector('._collapse'));
				if (el.classList.contains('_active-collapse')) {
					el.classList.remove('_active-collapse');
					collapse.toggle();
				} else {
					el.classList.add('_active-collapse');
					collapse.toggle();
				}
			};
			//todo Нажатие на Tab или Escape. Закрыть дропдаун;
			document.addEventListener('keydown', function (el) {
				if (el.key === 'Tab' || el.key === 'Escape') {
					selectButton.blur();
					closeBos();
				}
			});
			//todo Клик снаружи дропдауна. Закрыть дропдаун;
			document.addEventListener('click', function (e) {
				const classList = e.target.classList;
				switch (true) {
					case classList.contains('select__button'):
						break;
					case classList.contains('select__list-item'):
						break;
					default:
						closeBos();
						break;
				};
			});
			//todo Клик снаружи дропдауна. Переключатель классов. Закрыть дропдаун;
			function closeBos() {
				const dropDown = document.querySelectorAll('.select');
				dropDown.forEach(el => {
					if (el.classList.contains('_active-collapse')) {
						_toggleOpen(el);
					}
				});
			}
		});
	}
});
// * ---------------------------------------------------------------------------
const oneLincks = document.querySelector('._select-one').children;
const twoLincks = document.querySelector('._select-two').children;
for (const i in oneLincks) {
	const oneLinck = oneLincks[i];
	const twoLinck = twoLincks[i];
	if (Object.hasOwnProperty.call(twoLincks, i)) {
		oneLinck.addEventListener('click', function () {
			const one_linck = document.querySelector('._select-one').querySelector('._selected');
			const two_linck = document.querySelector('._select-two').querySelector('._selected');
			_selectList(one_linck);
			if (one_linck && one_linck !== twoLinck) {
				_selectList(oneLinck);
			}
			_selectList(two_linck);
			if (two_linck && two_linck !== oneLinck) {
				_selectList(twoLinck);
			}
		});
	}
}
for (const i in twoLincks) {
	const oneLinck = oneLincks[i];
	const twoLinck = twoLincks[i];
	if (Object.hasOwnProperty.call(oneLincks, i)) {
		twoLinck.addEventListener('click', function () {
			const one_linck = document.querySelector('._select-one ').querySelector('._selected');
			const two_linck = document.querySelector('._select-two').querySelector('._selected');
			_selectList(two_linck);
			_selectList(one_linck);
			if (one_linck && one_linck !== twoLinck) {
				_selectList(oneLinck);
			}
			if (two_linck && two_linck !== oneLinck) {
				_selectList(twoLinck);
			}

		});
	}
}
const _selectList = (el) => {
	if (el.classList.contains('_selected')) {
		el.classList.remove('_selected');
	} else {
		el.classList.add('_selected');
	}
};
//* ----------------------------------------------------------------------------
// window.addEventListener("keydown", function (e) {
// 	if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
// 		e.preventDefault();
// 	}
// }, false);
//* ----------------------------------------------------------------------------