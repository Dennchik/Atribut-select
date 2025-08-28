"use strict";

document.addEventListener('DOMContentLoaded', function () {
  ItcCustomSelect.create('.select-1', {
    name: 'car',
    targetValue: 'ford',
    options: [['volkswagen', 'Volkswagen'], ['ford', 'Ford'], ['toyota', 'Toyota'], ['nissan', 'Nissan']],
    onSelected: function onSelected(select, option) {
      console.log("\u0412\u044B\u0431\u0440\u0430\u043D\u043D\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435: ".concat(select.value));
      console.log("\u0418\u043D\u0434\u0435\u043A\u0441 \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u043E\u0439 \u043E\u043F\u0446\u0438\u0438: ".concat(select.selectedIndex));
      var text = option ? option.textContent : '';
      console.log("\u0412\u044B\u0431\u0440\u0430\u043D\u043D\u044B\u0439 \u0442\u0435\u043A\u0441\u0442 \u043E\u043F\u0446\u0438\u0438: ".concat(text));
    }
  });
  document.querySelector('.itc-select').addEventListener('itc.select.change', function (e) {
    var btn = e.target.querySelector('.itc-select__toggle');
    console.log("\u0412\u044B\u0431\u0440\u0430\u043D\u043D\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435: ".concat(btn.value));
    console.log("\u0418\u043D\u0434\u0435\u043A\u0441 \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u043E\u0439 \u043E\u043F\u0446\u0438\u0438: ".concat(btn.dataset.index));
    var selected = e.target.querySelector('.itc-select__option_selected');
    var text = selected ? selected.textContent : '';
    console.log("\u0412\u044B\u0431\u0440\u0430\u043D\u043D\u044B\u0439 \u0442\u0435\u043A\u0441\u0442 \u043E\u043F\u0446\u0438\u0438: ".concat(text));
  });
});
//# sourceMappingURL=js.js.map
