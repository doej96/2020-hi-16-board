var swiper;

function onPlus(el) {
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

function onModalShow(el, e, id) {
	var html = '';
	e.stopPropagation();
	$(".modal-wrapper").css('display', 'flex');
	$(".modal-wrapper").css('opacity'); //opacity 다시 읽어줌
	$(".modal-wrapper").addClass('active')
	$('.modal-wrapper .loader').show();
	$('.modal-wrapper .modal-wrap').removeClass('active');
	$.get('/gallery/api/view/'+id, function(r){ //
		for(var i in r.src) {
			console.log(r);
			html += '<div class="swiper-slide">'
			html += '<img class="mw-100" src="'+r.src[i]+'" alt="image">'
			html += '</div>'
		}
		$('.modal-wrapper .swiper-wrapper').html(html);
		$('.modal-wrapper .info-wrapper .content').eq(0).html(r.title);
		$('.modal-wrapper .info-wrapper .content').eq(1).html(r.writer);
		$('.modal-wrapper .info-wrapper .content').eq(2).html(r.created);
		$('.modal-wrapper .info-wrapper .content').eq(3).html(r.content);
		if(r.src.length == 0) {
			$('.modal-wrapper .fa-download').hide();
			$('.modal-wrapper .fa-info-circle').css('font-size','3em');
		}
		else {
			$('.modal-wrapper .fa-download').show();
			$('.modal-wrapper .fa-info-circle').css('font-size','');
		}
		$('.modal-wrapper .swiper-wrapper').imagesLoaded(function(){
			$('.modal-wrapper .loader').hide();
			$('.modal-wrapper .modal-wrap').addClass('active');
			if(swiper) swiper.destroy();
				swiper = new Swiper('.swiper-container', {
					spaceBetween: 10,
					autoHeight: true,
					loop: true,
					pagination: {
						el: '.swiper-pagination',
						clickable: true
					},
				});
				swiper.on('slideChange', function () {
					console.log('slide changed');
					console.log(swiper.realIndex);
				});
		});
	})
}

function onDelete(el, e, id) {
	e.stopPropagation();
	if(confirm('정말 삭제하시겠습니까?')) {
		location.href= '/gallery/delete/'+id;
	}
}

function onEdit(el, e, id) {
	e.stopPropagation();
	location.href= '/gallery/change/'+id
}

function onModalHide() {
	$(".modal-wrapper").removeClass('active')
	$(".info-wrapper").removeClass('active');
	setTimeout(function(){
		$(".modal-wrapper").css('display', 'none');
	},350)
}

function onInfoShow() {
	$(".info-wrapper").addClass('active');
}

function onInfoHide() {
	$(".info-wrapper").removeClass('active');
}

function init() {
	var $grid = $(".grid").imagesLoaded(onImagesLoaded);
	function onImagesLoaded() {
		$grid.masonry({
			itemSelector: '.grid-item',
			columnWidth: '.grid-sizer',
			percentPosition: true
		});
	}
}

init();