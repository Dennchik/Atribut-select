"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ItcCustomSelect = /*#__PURE__*/function () {
  function ItcCustomSelect(target, params) {
    _classCallCheck(this, ItcCustomSelect);

    this._el = typeof target === 'string' ? document.querySelector(target) : target;
    this._params = params || {};
    this._onClickFn = this._onClick.bind(this);

    if (this._params.options) {
      this._el.innerHTML = this.constructor.template(this._params);

      this._el.classList.add(this.constructor.EL);
    }

    this._elToggle = this._el.querySelector(this.constructor.DATA_TOGGLE);

    this._el.addEventListener('click', this._onClickFn);
  }

  _createClass(ItcCustomSelect, [{
    key: "_onClick",
    value: function _onClick(e) {
      var target = e.target;
      var type = target.closest(this.constructor.DATA).dataset.select;

      if (type === 'toggle') {
        this.toggle();
      } else if (type === 'option') {
        this._changeValue(target);
      }
    }
  }, {
    key: "_updateOption",
    value: function _updateOption(el) {
      var elOption = el.closest(".".concat(this.constructor.EL_OPTION));

      var elOptionSel = this._el.querySelector(".".concat(this.constructor.EL_OPTION_SELECTED));

      if (elOptionSel) {
        elOptionSel.classList.remove(this.constructor.EL_OPTION_SELECTED);
      }

      elOption.classList.add(this.constructor.EL_OPTION_SELECTED);
      this._elToggle.textContent = elOption.textContent;
      this._elToggle.value = elOption.dataset.value;
      this._elToggle.dataset.index = elOption.dataset.index;

      this._el.dispatchEvent(new CustomEvent('itc.select.change'));

      this._params.onSelected ? this._params.onSelected(this, elOption) : null;
      return elOption.dataset.value;
    }
  }, {
    key: "_reset",
    value: function _reset() {
      var selected = this._el.querySelector(".".concat(this.constructor.EL_OPTION_SELECTED));

      if (selected) {
        selected.classList.remove(this.constructor.EL_OPTION_SELECTED);
      }

      this._elToggle.textContent = 'Выберите из списка';
      this._elToggle.value = '';
      this._elToggle.dataset.index = '-1';

      this._el.dispatchEvent(new CustomEvent('itc.select.change'));

      this._params.onSelected ? this._params.onSelected(this, null) : null;
      return '';
    }
  }, {
    key: "_changeValue",
    value: function _changeValue(el) {
      if (el.classList.contains(this.constructor.EL_OPTION_SELECTED)) {
        return;
      }

      this._updateOption(el);

      this.hide();
    }
  }, {
    key: "show",
    value: function show() {
      var _this = this;

      document.querySelectorAll(this.constructor.EL_SHOW).forEach(function (el) {
        el.classList.remove(_this.constructor.EL_SHOW);
      });

      this._el.classList.add("".concat(this.constructor.EL_SHOW));
    }
  }, {
    key: "hide",
    value: function hide() {
      this._el.classList.remove(this.constructor.EL_SHOW);
    }
  }, {
    key: "toggle",
    value: function toggle() {
      this._el.classList.contains(this.constructor.EL_SHOW) ? this.hide() : this.show();
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this._el.removeEventListener('click', this._onClickFn);
    }
  }, {
    key: "value",
    get: function get() {
      return this._elToggle.value;
    },
    set: function set(value) {
      var _this2 = this;

      var isExists = false;

      this._el.querySelectorAll('.select__option').forEach(function (option) {
        if (option.dataset.value === value) {
          isExists = true;

          _this2._updateOption(option);
        }
      });

      if (!isExists) {
        this._reset();
      }
    }
  }, {
    key: "selectedIndex",
    get: function get() {
      return this._elToggle.dataset.index;
    },
    set: function set(index) {
      var option = this._el.querySelector(".select__option[data-index=\"".concat(index, "\"]"));

      if (option) {
        this._updateOption(option);
      }

      this._reset();
    }
  }], [{
    key: "template",
    value: function template(params) {
      var _this3 = this;

      var name = params.name,
          options = params.options,
          targetValue = params.targetValue;
      var items = [];
      var selectedIndex = -1;
      var selectedValue = '';
      var selectedContent = 'Выберите из списка';
      options.forEach(function (option, index) {
        var selectedClass = '';

        if (option[0] === targetValue) {
          selectedClass = " ".concat(_this3.EL_OPTION_SELECTED);
          selectedIndex = index;
          selectedValue = option[0];
          selectedContent = option[1];
        }

        items.push("<li class=\"itc-select__option".concat(selectedClass, "\"data-select=\"option\"\n    data-value=\"").concat(option[0], "\" data-index=\"").concat(index, "\">").concat(option[1], "</li>"));
      });
      return "<button type=\"button\" class=\"itc-select__toggle\" name=\"".concat(name, "\"\n    value=\"").concat(selectedValue, "\" data-select=\"toggle\" data-index=\"").concat(selectedIndex, "\">\n    ").concat(selectedContent, "</button><div class=\"itc-select__dropdown\">\n    <ul class=\"itc-select__options\">").concat(items.join(''), "</ul></div>");
    }
  }, {
    key: "hideOpenSelect",
    value: function hideOpenSelect() {
      var _this4 = this;

      document.addEventListener('click', function (e) {
        if (!e.target.closest(".".concat(_this4.EL))) {
          var elsActive = document.querySelectorAll(".".concat(_this4.EL_SHOW));
          elsActive.forEach(function (el) {
            el.classList.remove(_this4.EL_SHOW);
          });
        }
      });
    }
  }, {
    key: "create",
    value: function create(target, params) {
      this._el = typeof target === 'string' ? document.querySelector(target) : target;

      if (this._el) {
        return new this(target, params);
      }

      return null;
    }
  }]);

  return ItcCustomSelect;
}();

_defineProperty(ItcCustomSelect, "EL", 'itc-select');

_defineProperty(ItcCustomSelect, "EL_SHOW", 'itc-select_show');

_defineProperty(ItcCustomSelect, "EL_OPTION", 'itc-select__option');

_defineProperty(ItcCustomSelect, "EL_OPTION_SELECTED", 'itc-select__option_selected');

_defineProperty(ItcCustomSelect, "DATA", '[data-select]');

_defineProperty(ItcCustomSelect, "DATA_TOGGLE", '[data-select="toggle"]');

ItcCustomSelect.hideOpenSelect();
//# sourceMappingURL=itc-custom-select.js.map
