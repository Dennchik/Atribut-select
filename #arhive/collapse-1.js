//* ------------------------------ [Select]-------------------------------------
const itsSelect = document.querySelectorAll('[data-select]');
if (itsSelect) {
	itsSelect.forEach(select => {
		const dropDownBtn = select.querySelector('.dropdown__button');
		const dropDownBox = select.querySelector('.dropdown__box-button');
		console.log(dropDownBox);
		const dropDownList = select.querySelector('.dropdown__list');
		const listItems = dropDownList.querySelectorAll('.dropdown__list-item');
		dropDownBox.addEventListener('click', function (el) {
			target = el.target;
			if (target.closest('.dropdown__box-button')) {
				dropDownList.classList.toggle('_list-visible');
				dropDownBox.classList.toggle('_active');
				target = el.target.closest('.dropdown__box-button').nextElementSibling.querySelector('._selected');
				dropDownBtn.value = target.innerText;
				collapse.toggle();

			}
		});
		const collapse = new ItcCollapse(select.querySelector('._collapse'));
		if (listItems.length !== 0) {
			var start = listItems[0];
			[].forEach.call(listItems, function (item) {
				item.addEventListener('click', function () {
					start = this;
					start.focus();
					dropDownBtn.value = item.innerText;
					collapse.toggle();
					const el_selected = dropDownList.querySelector('._selected');
					_toggleItem(item);
					if (el_selected && el_selected !== item) {
						_toggleItem(el_selected);
					} else {
						item.classList.add('_selected');
					}
				});
			});
		}

		select.addEventListener('keydown', function (e) {
			e = e || window.e;
			if (e.key == 'ArrowUp') {
				//* Arrow Up
				let sibling = start.previousElementSibling;
				dotheneedful(sibling);

			} else if (e.key == 'ArrowDown') {
				//* Arrow Down
				let sibling = start.nextElementSibling;
				dotheneedful(sibling);
			}
		});

		function dotheneedful(sibling) {
			if (sibling !== null) {
				start.focus();
				start.classList.remove('_selected');
				sibling.focus();
				sibling.classList.add('_selected');
				start = sibling;
			}
		}
		//* ------------------------------------------------------------------------
		//todo Переключатель классов
		const _toggleItem = (listItem) => {
			if (listItem.classList.contains('_selected')) {
				listItem.classList.remove('_selected');
			} else {
				listItem.classList.add('_selected');
			}
		};
		//todo Клик снаружи дропдауна. Закрыть дропдаун
		document.addEventListener('click', function (el) {
			if (el.target !== dropDownBtn) {
				dropDownBox.classList.remove('_active');
				dropDownList.classList.remove('_list-visible');
				collapse.toggle();
			}
		});
		//todo Нажатие на Tab или Escape. Закрыть дропдаун
		document.addEventListener('keydown', function (e) {
			if (e.key === 'Tab' || e.key === 'Escape') {
				dropDownBox.classList.remove('_active');
				console.log(dropDownBox);
				dropDownList.classList.remove('_list-visible');
				collapse.toggle();
			}
		});
	});
}
window.addEventListener("keydown", function (e) {
	if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
		e.preventDefault();
	}
}, false);