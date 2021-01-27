const express = require('express');
const router = express.Router();
const pugs = {css: 'board', js: 'board', title:'Express Board', headerTitle:'Node/Express를 활용한 게시판'}

router.get('/', (req, res, next) => {
  res.render('board/list', {...pugs});
})

router.get('/create', (req, res, next) => {
  const pug = { ...pugs, tinyKey: 'qx4vtweateu7xp7hswelnwpv9s6tnhifw0pv0g3dd013z70t' }
  res.render('board/create', pug);
})

module.exports = router;