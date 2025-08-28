function MaterialSelect(selector) {

	var _self = this;
	_self.selector = selector;
	_self.option = {
		focusClass: "is-focused",
		checkedClass: "is-checked"
	};

	_self.init = function () {
		jQuery(selector).each(function () {
			var $selectHolder = jQuery(this);
			var $select = $selectHolder.find("select");
			// check if input already initialized
			if ($selectHolder.data("material-select")) {
				return;
			}
			// add event listeners
			$select.on("change focus", _self.checkValue);
			$select.on("focus blur", _self.checkFocus);
			// trigger blur event after selection
			$select.on("change", function () {
				jQuery(this).blur();
			});
			// check on init
			_self.checkValue.call($select);

			$selectHolder.data("material-select", true);
		});
	};

	_self.isChecked = function ($select) {
		if ($select.find(":selected").length && $select.val() !== "") {
			return true;
		}
		return false;
	};

	_self.isFocused = function ($select) {
		return $select.is(":focus");
	};

	_self.checkValue = function () {
		var $select = jQuery(this);
		var $selectHolder = $select.closest(_self.selector);

		// if value is not empty
		if (_self.isChecked($select)) {
			$selectHolder.addClass(_self.option.checkedClass);
		} else {
			$selectHolder.removeClass(_self.option.checkedClass);
		}
	};

	_self.checkFocus = function () {
		var $select = jQuery(this);
		var $selectHolder = $select.closest(_self.selector);

		// delay :focus check since on IOS its not being applied immediately
		setTimeout(function () {
			// if select has focus
			if (_self.isFocused($select)) {
				$selectHolder.addClass(_self.option.focusClass);
			} else {
				$selectHolder.removeClass(_self.option.focusClass);
			}
		}, 0);
	};

	_self.init();
}

// jQuery(function ($) {
// 	var materialSelect = new MaterialSelect(".js-material-select");
// });
