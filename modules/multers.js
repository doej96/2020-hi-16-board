const multer = require('multer');
const fs = require('fs-extra');
const {v4} = require('uuid')
const moment = require('moment')
const path = require('path')

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

const upload = multer({ storage })

module.exports = {upload}