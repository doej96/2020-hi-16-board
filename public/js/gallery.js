function onPlus() {
	if($(".file-wrapper .file-wrap").length < 9) {
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
	if($(".file-wrap").length >= 10) $(".file-wrap").eq(0).find("a").hide();
}

function onMinus(el) {
	$(".file-wrap").eq(0).find("a").show();
	$(el).parent().parent().remove();
}

function onSave(f) {
	if(f.title.value.trim() == "") {
		alert('제목을 입력하세요.');
		f.title.focus();
		return false;
	}
	var isFile = false
	if(Array.isArray(f.upfile)){
		for(var i=0; i<f.upfile.length; i++) { //upfile 한개만 있으면 배열 아니라 객체로 생성됨
			if(f.upfile[i].files.length == 1) {
				isFile = true;
				break;
			}
		}
	}
	else {
		if(f.upfile.files.length == 1) isFile = true;
	}
	if(!isFile) {
		alert('첨부이미지는 1개 이상 등록하셔야 합니다.');
		return false;
	}
	return true;
}