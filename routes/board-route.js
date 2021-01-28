const express = require('express');
const router = express.Router();
const { upload } = require('../modules/multers')
const { pool } = require('../modules/mysql-pool');
const { err, alert } = require('../modules/util');
const pagers = require('../modules/pagers')
const moment = require('moment')
const path = require('path')
const pugs = { 
	css: 'board', 
	js: 'board', 
	title: 'Express Board', 
	headerTitle: 'Node/Express를 활용한 게시판' 
}

router.get(['/', '/list'], async (req, res, next) => { // /:page(params) : 주소줄에 board/1 -> 1페이지
	try {
		let sql, value, r, rs, pager;
    sql = 'SELECT count(*) FROM board';
    r = await pool.query(sql);
		// res.json(r[0][0]); //count(*) = 데이터갯수
		pager = pagers(req.query.page || 1, r[0][0]['count(*)']);
		sql = 'SELECT * FROM board ORDER BY id DESC LIMIT ?, ?';   
		value = [pager.startIdx, pager.listCnt];
		r = await pool.query(sql, value);
		rs = r[0].map((v) => {
			v.wdate = moment(v.wdate).format('YYYY-MM-DD');
			if(v.savefile) {
				let ext = path.extname(v.savefile).substr(1).toLowerCase();
				ext = (ext == 'jpeg') ? 'jpg': ext;
				ext = ext.substr(0, 3);
				v.icon = `/img/ext/${ext}.png`;
			}
			else v.icon = '/img/empty.png';
			return v;
		});
		res.render('board/list', { ...pugs, rs, pager });
	}
	catch(e) {
		next(err(e.message));
	}
});

router.get('/create', (req, res, next) => {
	const pug = { ...pugs, tinyKey: process.env.TINY_KEY }
	res.render('board/create', pug);
});

router.post('/save', upload.single('upfile'), async (req, res, next) => { //upfile:필드명(input name)
  //console.log(req.file)
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
				sql += ', orifile=?, savefile=?';
				value.push(req.file.originalname, req.file.filename);
			}
			const r = await pool.query(sql, value);
			res.redirect('/board');
		}
	}
	catch(e) {
		next(err(e.message));
	}
});

module.exports = router;