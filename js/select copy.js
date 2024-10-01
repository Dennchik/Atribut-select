document.querySelectorAll('[data-select]').forEach((selectGroup) => {
	const itsSelects = selectGroup.querySelectorAll('.select');
	const selectGroupInputs = selectGroup.getElementsByClassName('select__input');

	itsSelects.forEach((itsSelect, selectIndex) => {
		const listItems = itsSelect.querySelectorAll('.select__list-item');
		const selectButton = itsSelect.querySelector('.select__button');


		const _toggleOpen = (el) => {
			const collapse = new ItcCollapse(el.closest('.select').querySelector('._collapse'));
			el.classList.toggle('_active-collapse');
			collapse.toggle();
		};

		const closeBos = () => {
			document.querySelectorAll('.select._active-collapse').forEach(el => _toggleOpen(el));
		};

		const selectNext = (sibling) => {

			if (sibling) {
				start.focus();
				start.classList.remove('_selected');
				sibling.focus();
				sibling.classList.add('_selected');
				start = sibling;
			}
		};

		const updateSelectedItem = (listItem, index) => {
			const prevSelected = itsSelect.querySelector('._selected');
			start = listItem;
			start.focus();
			prevSelected && prevSelected.classList.remove('_selected');
			listItem.classList.add('_selected');
			selectValue(index);
			closeBos();
		};

		const selectValue = (selectedIndex) => {
			const value = start.textContent;

			// Обновляем значение для всех инпутов в текущей группе
			Array.from(selectGroupInputs).forEach(input => input.value = value);
			selectButton.blur();

			// Синхронизация других select элементов в группе
			itsSelects.forEach((otherSelect, otherSelectIndex) => {
				if (otherSelectIndex !== selectIndex) {
					const otherListItems = otherSelect.querySelectorAll('.select__list-item');
					otherSelect.querySelector('._selected')?.classList.remove('_selected');
					otherListItems[selectedIndex]?.classList.add('_selected');
				}
			});
		};

		if (listItems.length) {
			var start = listItems[0];

			itsSelect.addEventListener('click', (e) => {
				const target = e.target;

				if (target.closest('.select__button')) {
					const openedSelect = document.querySelector('._active-collapse');
					_toggleOpen(itsSelect);
					start = target.closest('.select__button').nextElementSibling.querySelector('._selected');
					console.log(start);


					if (openedSelect && openedSelect !== itsSelect) {
						_toggleOpen(openedSelect);
					}
				}

				if (!target.closest('.select').classList.contains('_active-collapse')) {
					selectButton.blur();
				}
			});

			listItems.forEach((listItem, index) => {
				listItem.addEventListener('click', () => updateSelectedItem(listItem, index));
			});

			selectGroup.addEventListener('keydown', (e) => {
				if (['ArrowUp', 'ArrowDown', 'Enter'].includes(e.key)) e.preventDefault();
				if (e.key === 'ArrowUp') selectNext(start.previousElementSibling);
				if (e.key === 'ArrowDown') selectNext(start.nextElementSibling);
				if (e.key === 'Enter') {
					const selectedIndex = Array.from(listItems).indexOf(start);
					selectValue(selectedIndex);
					closeBos();
				}
			});
		}

		document.addEventListener('keydown', (e) => {
			if (['Tab', 'Escape'].includes(e.key)) {
				selectButton.blur();
				closeBos();
			}
		});

		document.addEventListener('click', (e) => {
			if (!e.target.closest('.select')) closeBos();
		});
	});
});
