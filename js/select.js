document.querySelectorAll('[data-select]').forEach(function
	(selectGroup) {
	console.log(selectGroup);

	const itsSelects = selectGroup.querySelectorAll('.select');
	if (itsSelects) {
		itsSelects.forEach((itsSelect, selectIndex) => {
			const listItems = itsSelect.querySelectorAll('.select__list-item');
			const selectButton = itsSelect.querySelector('.select__button');
			let start = listItems[0]; // Инициализация переменной `start`

			// Функция для переключения активного элемента
			const selectNext = (sibling) => {
				if (sibling !== null) {
					start.classList.remove('_selected');
					sibling.focus();
					sibling.classList.add('_selected');
					start = sibling;
				}
			};

			// Переключатель классов
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

			// Закрытие всех дропдаунов
			const closeBos = () => {
				const dropDown = document.querySelectorAll('.select');
				dropDown.forEach(el => {
					if (el.classList.contains('_active-collapse')) {
						_toggleOpen(el);
					}
				});
			};


			itsSelect.addEventListener('click', function (e) {
				let target = e.target;

				if (target.closest('.select__button')) {
					const opened_select = document.querySelector('._active-collapse');
					_toggleOpen(itsSelect);
					start = target.closest('.select__button').nextElementSibling.querySelector('._selected') || listItems[0]; // Устанавливаем стартовый элемент

					if (opened_select && opened_select !== itsSelect) {
						_toggleOpen(opened_select);
					}
				}

				if (!target.closest('.select').classList.contains('_active-collapse')) {
					selectButton.blur();
				}
			});

			// Работа с клавишами
			selectGroup.addEventListener('keydown', function (e) {
				if (['ArrowUp', 'ArrowDown', 'Enter'].includes(e.key)) e.preventDefault();

				if (e.key == 'ArrowUp') {
					let sibling = start.previousElementSibling || listItems[listItems.length - 1]; // Если нет предыдущего, выбираем последний элемент
					selectNext(sibling);
				} else if (e.key == 'ArrowDown') {
					let sibling = start.nextElementSibling || listItems[0]; // Если нет следующего, выбираем первый элемент
					selectNext(sibling);
				} else if (e.key == 'Enter') {
					const selectedIndex = Array.from(listItems).indexOf(start);
					selectValue(selectedIndex);
					closeBos();
				}
			});

			if (listItems.length !== 0) {
				listItems.forEach(function (listItem, index) {
					listItem.addEventListener('click', function () {
						const el_selected = itsSelect.querySelector('._selected');
						start = this;
						start.focus();
						_listItem(listItem, index);
						if (el_selected && el_selected !== listItem) {
							_listItem(el_selected);
						} else {
							listItem.classList.add('_selected');
						}
						selectValue(index); // Передаем индекс для синхронизации с другим списком
					});
				});

				// Функция для синхронизации
				function selectValue(selectedIndex) {
					let inputs = selectGroup.getElementsByClassName('select__input');

					// Для текущего select
					for (let i = 0; i < inputs.length; i++) {
						inputs[i].value = start.textContent;
						selectButton.blur();
					};

					// Для синхронизации с другим select
					itsSelects.forEach((otherSelect, otherSelectIndex) => {
						if (otherSelectIndex !== selectIndex) {
							const otherListItems = otherSelect.querySelectorAll('.select__list-item');
							const el_selected = otherSelect.querySelector('._selected');

							if (el_selected) {
								el_selected.classList.remove('_selected');
							}

							const correspondingItem = otherListItems[selectedIndex];
							correspondingItem.classList.add('_selected');
						}
					});
				}

				// Переключатель классов
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

			// Закрыть дропдаун при нажатии Tab или Escape
			document.addEventListener('keydown', function (el) {
				if (el.key === 'Tab' || el.key === 'Escape') {
					selectButton.blur();
					closeBos();
				}
			});

			// Закрыть дропдаун при клике снаружи
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
		});
	}
});
