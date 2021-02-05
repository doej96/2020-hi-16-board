const multer = require('multer');
const fs = require('fs-extra');
const {v4} = require('uuid')
const moment = require('moment')
const path = require('path')

const imgExt = ['jpg', 'jpeg', 'png', 'gif'];
const allowExt = [...imgExt, 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'md', 'zip', 'hwp'];

const destCb = (req, res, cb) => {
  var folder = path.join(__dirname, '../uploads', moment().format('YYMMDD_HH'))
  fs.ensureDirSync(folder);
  cb(null, folder)
}
const fileCb = (req, file, cb) => {
  var ext = path.extname(file.originalname) //extname : 파일명의 확장자 나옴
  var name = moment().format('YYMMDD_HH') + '-' + v4() + ext; //v4().replace(/-/gi, '')
  cb(null, name)
}

const storage = multer.diskStorage({
  destination: destCb,
  filename: fileCb
})

const limits = {fileSize: 10240000}
const fileFilter = (req, file, cb) => {
  var ext = path.extname(file.originalname).substr(1).toLocaleLowerCase();
  //확장자 추출(.Jpg -> Jpg -> jpg)
  if(allowExt.includes(ext)) { //allowExt.indexOf(ext) > -1 (ES5)
    cb(null, true);
  }
  else {
    req.banExt = ext;
    cb(null, false);
  }  
  // 이 함수는 boolean 값과 함께 `cb`를 호출함으로써 해당 파일을 업로드 할지 여부를 나타낼 수 있습니다.
  // 이 파일을 거부하려면 다음과 같이 `false` 를 전달합니다:
  //cb(null, false)
  
  // 이 파일을 허용하려면 다음과 같이 `true` 를 전달합니다:
  //cb(null, true)
  
  // 무언가 문제가 생겼다면 언제나 에러를 전달할 수 있습니다:
  //cb(new Error('I don\'t have a clue!'))
}

const imgFilter = (req, file, cb) => {
  var ext = path.extname(file.originalname).substr(1).toLowerCase();
  if(imgExt.includes(ext)) {
    cb(null, true);
  }
  else {
    req.banExt = ext;
    cb(null, false);
  }
}

const upload = multer({ storage, limits, fileFilter })
const uploadImg = multer({ storage, limits, fileFilter: imgFilter });

module.exports = { upload, uploadImg, imgExt, allowExt }