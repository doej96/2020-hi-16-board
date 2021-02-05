function onPlus() {
	var html = ``;
	html += '<div class="list-wrap file-wrap">';
	html += '<div class="title">첨부이미지</div>';
	html += '<div class="list">';
	html += '<input class="form-control-file" type="file" name="upfile">';
	html += '</div>';
	html += '<div class="bts">';
	html += '<i class="fa fa-minus-circle text-danger" onclick="onMinus(this)"></i>';
	// <a href="javascript: onMinus(this)"> -> this : document
	// onclick -> this: a태그
	html += '</div>';
	html += '</div>';
	$(".file-wrapper").append(html);
}

function onMinus(el) {
	$(el).parent().parent().remove();
}