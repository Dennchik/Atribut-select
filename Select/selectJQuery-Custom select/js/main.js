$(".js-select").each(function () {
	var _this = $(this),
		wrap = '<div class="select-wrap"></div>',
		item = _this.find('option'),
		selectWrap = _this.parents(".select-wrap"),
		list = '<ul class="select-list"></ul>';
	_this.wrap(wrap);
	selectWrap.appendTo(list);

	var classes = $(this).attr("class"),
		id = $(this).attr("id"),
		name = $(this).attr("name"),
		placeholder = $(this).attr("placeholder");
	var template = '<div class="' + classes + '">';

	template += '<span class="select-trigger">' + placeholder + '</span>';
	template += '<div class="options">';
	$(this).find("option").each(function () {
		template += '<span class="option ' + $(this).attr("class") + '" data-value="' + $(this).attr("value") + '">' + $(this).html() + '</span>';
	});
	template += '</div></div>';

	$(this).wrap('<div class="select-wrap"></div>');
	$(this).hide();
	$(this).after(template);
});

$(".select-trigger").on("click", function () {
	$(this).parents(".select").toggleClass("opened");
	event.stopPropagation();
});
$(".option").on("click", function () {
	var select = $(this).parents(".select-wrap"),
		val = $(this).attr("data-val");
	select.find("select").val($(this).data("value"));
	select.find("option").removeAttr("selected");
	select.find('option[value=' + val + ']').attr("selected", "selected");
	$(this).parents(".select").removeClass("opened");
	$(this).parents(".select").addClass("selected");
	$(this).parents(".select").find(".select-trigger").text($(this).text());
});
$('html').on('click', function () {
	$(".select").removeClass("opened");
});