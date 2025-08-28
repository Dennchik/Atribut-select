document.addEventListener('DOMContentLoaded', () => {
	ItcCustomSelect.create('.select-1', {
		name: 'car',
		targetValue: 'ford',
		options: [
			['volkswagen', 'Volkswagen'],
			['ford', 'Ford'],
			['toyota', 'Toyota'],
			['nissan', 'Nissan']
		],
		onSelected(select, option) {

			console.log(`Выбранное значение: ${select.value}`);

			console.log(`Индекс выбранной опции: ${select.selectedIndex}`);

			const text = option ? option.textContent : '';
			console.log(`Выбранный текст опции: ${text}`);
		},
	});
	document.querySelector('.itc-select').addEventListener('itc.select.change', (e) => {
		const btn = e.target.querySelector('.itc-select__toggle');

		console.log(`Выбранное значение: ${btn.value}`);

		console.log(`Индекс выбранной опции: ${btn.dataset.index}`);

		const selected = e.target.querySelector('.itc-select__option_selected');
		const text = selected ? selected.textContent : '';
		console.log(`Выбранный текст опции: ${text}`);
	});
});
