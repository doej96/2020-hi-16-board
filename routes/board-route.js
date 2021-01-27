const express = require('express');
const router = express.Router();
const { upload } = require('../modules/multers')
const { pool } = require('../modules/mysql-pool');
const { err, alert } = require('../modules/util');
const pugs = { 
	css: 'board', 
	js: 'board', 
	title: 'Express Board', 
	headerTitle: 'Node/Express를 활용한 게시판' 
}

router.get('/', (req, res, next) => {
	res.render('board/list', { ...pugs });
});

router.get('/create', (req, res, next) => {
	const pug = { ...pugs, tinyKey: process.env.TINY_KEY }
	res.render('board/create', pug);
});

router.post('/save', upload.single('upfile'), async (req, res, next) => { //upfile:필드명(input name)
  console.log(req.file)
	try {
		const { title, content, writer } = req.body;
		let sql = 'INSERT INTO board SET title=?, content=?, writer=?'; //sql을 const로 만들면 += 안됨
    const value = [title, content, writer];
    if(req.banExt) {
      //history.go(-1)
      res.send(alert(`${req.banExt} 파일은 업로드 할 수 없습니다.`));
      //next(err(`${req.banExt}파일은 업로드 할 수 없습니다.`))
    }
    else {
      if(req.file) {
        sql += ', orifile=?, savefile=?'
        value.push(req.file.originalname, req.file.filename)
      }
      const r = await pool.query(sql, value);
      res.redirect('/board');
      }
    }
	catch(e) {
    res.json(e)
		//next(err(e));
	}
});

module.exports = router;