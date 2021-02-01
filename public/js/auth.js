/* 
var $joinForm = $("form[name='joinForm']")
$joinForm.find("input[name='userid']").blur(); */

function comment(el, cmt, cls) {
  $(el).next().html(cmt);
  $(el).next().removeClass('active danger');
  $(el).next().addClass(cls);
}

function onBlurId(el) {
  function onResponse(r) {
    if(r.result) comment(el, '사용가능한 아이디입니다.', 'active')
    else comment(el, '존재하는 아이디입니다. 사용할 수 없습니다.', 'danger')
  }
  var userid = $(el).val().trim();
  if(userid.length < 8) {
    comment(el, '아이디는 8자 이상입니다.', 'danger')
  }
  else {
    $.get('/auth/userid', { userid: userid }, onResponse)
  }
}
function onBlurPw(el) {
  var pw = $(el).val().trim();
  var len = pw.length;
  var num = pw.search(/[0-9]/g);  // 숫자 포함 >=0
  var eng = pw.search(/[a-z]/ig);  //  >=0
  var spe = pw.search(/[`~!@@#$%^&*]/ig);
  if(len < 8 || len > 20) {
    comment(el, '비밀번호는 8자 이상 20자 이하입니다.', 'danger');
    return false; //여기서 끝냄
  }
  else if(num < 0 || eng < 0 || spe <0 ) {
    comment(el, '비밀번호는 영문자, 숫자, 특수문자를 포함하여야 합니다.', 'danger');
    return false;
  }
  comment(el, '비밀번호를 사용할 수 있습니다.', 'active');
}
function onBlurlPw2(el) {
  var f = document.joinForm;
  if(f.userpw.value.trim() !== f.userpw2.value.trim()) {
    comment(el, '비밀번호가 일치하지 않습니다.', 'danger');
    return false;
  }
  comment(el, '비밀번호를 사용할 수 있습니다.', 'active');
}

function onBlurName(el) {
  if($(el).val().trim().length == 0) {
    comment(el, '이름을 입력하세요.', 'danger');
    return false;
  }
}

function onBlurEmail(el) {
  var emailVal = $(el).value().trim();
  var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  if(emailVal.match(regExp) == null) {
    comment(el, '올바른 이메일이 아닙니다.', 'danger');
    return false;
  }
}