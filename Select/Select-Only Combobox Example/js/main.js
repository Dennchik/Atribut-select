/*
 *   This content is licensed according to the W3C Software License at
 *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 */

'use strict';

/* SСохраните список именованных действий в выпадающем списке для удобства чтения в будущем */
const SelectActions = {
	Close: 0,
	CloseSelect: 1,
	First: 2,
	Last: 3,
	Next: 4,
	Open: 5,
	PageDown: 6,
	PageUp: 7,
	Previous: 8,
	Select: 9,
	Type: 10,
};

/*
	* Helper functions
	* Фильтрует массив параметров по входной строке
	* Возвращает массив параметров, которые начинаются со строки фильтра, независимо от регистра 
*/

function filterOptions(options = [], filter, exclude = []) {
	return options.filter((option) => {
		const matches = option.toLowerCase().indexOf(filter.toLowerCase()) === 0;
		return matches && exclude.indexOf(option) < 0;
	});
};

//* Сопоставляет нажатие клавиши с действием
function getActionFromKey(event, menuOpen) {
	const { key, altKey, ctrlKey, metaKey } = event;
	const openKeys = ['ArrowDown', 'ArrowUp', 'Enter', ' ']; // all keys that will do the default open action
	// handle opening when closed
	if (!menuOpen && openKeys.includes(key)) {
		return SelectActions.Open;
	}

	//* начало и завершение перемещают выбранную опцию при открытии или закрытии
	if (key === 'Home') {
		return SelectActions.First;
	}
	if (key === 'End') {
		return SelectActions.Last;
	}

	//* Обрабатывает вводимые символы при открытии или закрытии
	if (
		key === 'Backspace' ||
		key === 'Clear' ||
		(key.length === 1 && key !== ' ' && !altKey && !ctrlKey && !metaKey)
	) {
		return SelectActions.Type;
	}

	//* Обращайтесь с ключами, когда они открыты
	if (menuOpen) {
		if (key === 'ArrowUp' && altKey) {
			return SelectActions.CloseSelect;
		} else if (key === 'ArrowDown' && !altKey) {
			return SelectActions.Next;
		} else if (key === 'ArrowUp') {
			return SelectActions.Previous;
		} else if (key === 'PageUp') {
			return SelectActions.PageUp;
		} else if (key === 'PageDown') {
			return SelectActions.PageDown;
		} else if (key === 'Escape') {
			return SelectActions.Close;
		} else if (key === 'Enter' || key === ' ') {
			return SelectActions.CloseSelect;
		}
	}
}

/* 
	*Возвращает индекс параметра из массива параметров, основанный на строке поиска 
	*Усли фильтр представляет собой несколько итераций одной и той же буквы (например, "aaa"), то циклически просматривайте совпадения по первой букве 
*/
function getIndexByLetter(options, filter, startIndex = 0) {
	const orderedOptions = [
		...options.slice(startIndex),
		...options.slice(0, startIndex),
	];
	const firstMatch = filterOptions(orderedOptions, filter)[0];
	const allSameLetter = (array) => array.every((letter) => letter === array[0]);

	//* Cначала проверьте, есть ли точное совпадение для введенной строки
	if (firstMatch) {
		return options.indexOf(firstMatch);
	}

	/* 
		* Если повторяется одна и та же буква, циклически просматривайте совпадения по первой букве 
	*/
	else if (allSameLetter(filter.split(''))) {
		const matches = filterOptions(orderedOptions, filter[0]);
		return options.indexOf(matches[0]);
	}

	//* если совпадений нет, вщзвпвщвет значение -1
	else {
		return -1;
	}
}

//* Получаем обновленный индекс параметров после выполнения действия;
function getUpdatedIndex(currentIndex, maxIndex, action) {
	const pageSize = 10; // used for pageup/pagedown

	switch (action) {
		case SelectActions.First:
			return 0;
		case SelectActions.Last:
			return maxIndex;
		case SelectActions.Previous:
			return Math.max(0, currentIndex - 1);
		case SelectActions.Next:
			return Math.min(maxIndex, currentIndex + 1);
		case SelectActions.PageUp:
			return Math.max(0, currentIndex - pageSize);
		case SelectActions.PageDown:
			return Math.min(maxIndex, currentIndex + pageSize);
		default:
			return currentIndex;
	}
}

//* Проверяем, виден ли элемент в окне просмотра браузера
function isElementInView(element) {
	var bounding = element.getBoundingClientRect();
	return (
		bounding.top >= 0 &&
		bounding.left >= 0 &&
		bounding.bottom <=
		(window.innerHeight || document.documentElement.clientHeight) &&
		bounding.right <=
		(window.innerWidth || document.documentElement.clientWidth)
	);
}

//* Проверяем, доступен ли элемент в данный момент для прокрутки
function isScrollable(element) {
	return element && element.clientHeight < element.scrollHeight;
}

/* 
*убедитесь, что данный дочерний элемент находится в пределах видимой области прокрутки родительского элемента;
*если дочерний элемент не виден, прокрутите родительский элемент; 
*/
function maintainScrollVisibility(activeElement, scrollParent) {
	const { offsetHeight, offsetTop } = activeElement;
	const { offsetHeight: parentOffsetHeight, scrollTop } = scrollParent;

	const isAbove = offsetTop < scrollTop;
	const isBelow = offsetTop + offsetHeight > scrollTop + parentOffsetHeight;

	if (isAbove) {
		scrollParent.scrollTo(0, offsetTop);
	} else if (isBelow) {
		scrollParent.scrollTo(0, offsetTop - parentOffsetHeight + offsetHeight);
	}
}

/*
 * Select Component;
 * Принимает элемент combobox и массив строковых параметров
*/
const Select = function (el, options = []) {
	//* element refs
	this.el = el;
	this.comboEl = el.querySelector('[role=combobox]');
	this.listboxEl = el.querySelector('[role=listbox]');

	//* data
	this.idBase = this.comboEl.id || 'combo';
	this.options = options;

	//* state
	this.activeIndex = 0;
	this.open = false;
	this.searchString = '';
	this.searchTimeout = null;

	//* init
	if (el && this.comboEl && this.listboxEl) {
		this.init();
	}
};

Select.prototype.init = function () {
	//* выберает первый вариант по умолчанию
	this.comboEl.innerHTML = this.options[0];

	//* Добавляет прослушиватели событий
	this.comboEl.addEventListener('blur', this.onComboBlur.bind(this));
	this.listboxEl.addEventListener('focusout', this.onComboBlur.bind(this));
	this.comboEl.addEventListener('click', this.onComboClick.bind(this));
	this.comboEl.addEventListener('keydown', this.onComboKeyDown.bind(this));

	// create options
	this.options.map((option, index) => {
		const optionEl = this.createOption(option, index);
		this.listboxEl.appendChild(optionEl);
	});
};

Select.prototype.createOption = function (optionText, index) {
	const optionEl = document.createElement('div');
	optionEl.setAttribute('role', 'option');
	optionEl.id = `${this.idBase}-${index}`;
	optionEl.className =
		index === 0 ? 'combo-option option-current' : 'combo-option';
	optionEl.setAttribute('aria-selected', `${index === 0}`);
	optionEl.innerText = optionText;

	optionEl.addEventListener('click', (event) => {
		event.stopPropagation();
		this.onOptionClick(index);
	});
	optionEl.addEventListener('mousedown', this.onOptionMouseDown.bind(this));

	return optionEl;
};

Select.prototype.getSearchString = function (char) {
	/*
	*сбросьте время ожидания ввода и начните новый тайм-аут
	* это позволяет нам сопоставлять несколько букв, как при обычном выборе
	*/
	if (typeof this.searchTimeout === 'number') {
		window.clearTimeout(this.searchTimeout);
	}

	this.searchTimeout = window.setTimeout(() => {
		this.searchString = '';
	}, 500);

	// добавьте самую последнюю букву в сохраненную строку поиска
	this.searchString += char;
	return this.searchString;
};

Select.prototype.onComboBlur = function (event) {
	//* Ничего не делает, если relatedTarget содержится в listbox
	if (this.listboxEl.contains(event.relatedTarget)) {
		return;
	}

	//* Выбирает текущую опцию и закройте
	if (this.open) {
		this.selectOption(this.activeIndex);
		this.updateMenuState(false, false);
	}
};

Select.prototype.onComboClick = function () {
	this.updateMenuState(!this.open, false);
};

Select.prototype.onComboKeyDown = function (event) {
	const { key } = event;
	const max = this.options.length - 1;

	const action = getActionFromKey(event, this.open);

	switch (action) {
		case SelectActions.Last:
		case SelectActions.First:
			this.updateMenuState(true);
		// intentional fallthrough
		case SelectActions.Next:
		case SelectActions.Previous:
		case SelectActions.PageUp:
		case SelectActions.PageDown:
			event.preventDefault();
			return this.onOptionChange(
				getUpdatedIndex(this.activeIndex, max, action)
			);
		case SelectActions.CloseSelect:
			event.preventDefault();
			this.selectOption(this.activeIndex);
		// intentional fallthrough
		case SelectActions.Close:
			event.preventDefault();
			return this.updateMenuState(false);
		case SelectActions.Type:
			return this.onComboType(key);
		case SelectActions.Open:
			event.preventDefault();
			return this.updateMenuState(true);
	}
};

Select.prototype.onComboType = function (letter) {
	//* Открывает окно списка, если оно закрыто
	this.updateMenuState(true);

	//* Ищет индекс первого подходящего варианта
	const searchString = this.getSearchString(letter);
	const searchIndex = getIndexByLetter(
		this.options,
		searchString,
		this.activeIndex + 1
	);

	//* Если совпадение было найдено, перейдите к нему
	if (searchIndex >= 0) {
		this.onOptionChange(searchIndex);
	}
	//* если совпадений нет, очистите тайм-аут и строку поиска
	else {
		window.clearTimeout(this.searchTimeout);
		this.searchString = '';
	}
};

Select.prototype.onOptionChange = function (index) {
	//* состояние обновления
	this.activeIndex = index;

	// update aria-active descendant
	this.comboEl.setAttribute('aria-activedescendant', `${this.idBase}-${index}`);

	//* обновить стили активных опций
	const options = this.el.querySelectorAll('[role=option]');
	[...options].forEach((optionEl) => {
		optionEl.classList.remove('option-current');
	});
	options[index].classList.add('option-current');

	//* убедитесь, что новая опция находится в поле зрения
	if (isScrollable(this.listboxEl)) {
		maintainScrollVisibility(options[index], this.listboxEl);
	}

	/* 	
		* убедитесь, что новая опция видна на экране
		* убедитесь, что новая опция находится в поле зрения 
	*/
	if (!isElementInView(options[index])) {
		options[index].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
	}
};

Select.prototype.onOptionClick = function (index) {
	this.onOptionChange(index);
	this.selectOption(index);
	this.updateMenuState(false);
};

Select.prototype.onOptionMouseDown = function () {
	/* 	
		* Клик на опцию вызовет событие размытия, но мы не хотим выполнять действие размытия клавиатуры по умолчанию 
	*/
	this.ignoreBlur = true;
};

Select.prototype.selectOption = function (index) {
	//* Состояние обновления
	this.activeIndex = index;

	// update displayed value
	const selected = this.options[index];
	this.comboEl.innerHTML = selected;

	//* Обновление aria-selected
	const options = this.el.querySelectorAll('[role=option]');
	[...options].forEach((optionEl) => {
		optionEl.setAttribute('aria-selected', 'false');
	});
	options[index].setAttribute('aria-selected', 'true');
};

Select.prototype.updateMenuState = function (open, callFocus = true) {
	if (this.open === open) {
		return;
	}

	//* Состояние обновления
	this.open = open;

	// update aria-expanded and styles
	this.comboEl.setAttribute('aria-expanded', `${open}`);
	open ? this.el.classList.add('open') : this.el.classList.remove('open');

	//* Обновить активного потомка
	const activeID = open ? `${this.idBase}-${this.activeIndex}` : '';
	this.comboEl.setAttribute('aria-activedescendant', activeID);

	if (activeID === '' && !isElementInView(this.comboEl)) {
		this.comboEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
	}

	//* При необходимости переместите фокус обратно в поле со списком
	callFocus && this.comboEl.focus();
};

// init select
window.addEventListener('load', function () {
	const options = [
		'Choose a Fruit',
		'Apple',
		'Banana',
		'Blueberry',
		'Boysenberry',
		'Cherry',
		'Cranberry',
		'Durian',
		'Eggplant',
		'Fig',
		'Grape',
		'Guava',
		'Huckleberry',
	];
	const selectEls = document.querySelectorAll('.js-select');

	selectEls.forEach((el) => {
		new Select(el, options);
	});
});
