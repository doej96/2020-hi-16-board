/*********** Import ***********/
require('dotenv').config();
const express = require('express')
const app = express();
const path = require('path')
const { err } = require('./modules/util')
const sessions = require('./modules/sessions')
const locals = require('./modules/locals')

/*********** Server ***********/
app.listen(process.env.PORT, () => {
  console.log('======================')
  console.log('http://127.0.0.1:'+process.env.PORT)
  console.log('======================')
});

/*********** View/pug ***********/
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))
app.locals.pretty = true;

/*********** POST/Body ***********/
app.use(express.json())
app.use(express.urlencoded({extended: false}))
//body를 parsing, 미들웨어(use)

/*********** Session ***********/
app.use(sessions());
/* 
app.set('trust proxy', 1)
app.use(session({  //use : 미들웨어
  secret: process.env.SESSION_KEY,  //salt
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }  //http이기 때문에 false, https면 true
}))
 */

app.use(locals());

/*********** Router ***********/
const authRouter = require('./routes/auth-route')
const boardRouter = require('./routes/board-route')
const apiRouter = require('./routes/api-route')
const galleryRouter = require('./routes/gallery-route')

app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/storages', express.static(path.join(__dirname, 'uploads')))
//브라우저의 root는 public이기 때문에 root(public)밖에 있는 uploads 불러서 사진 띄우려면 static으로 불러야함
//해킹방지 위해 이름 다르게 설정, storages라고 치면 uploads폴더 뜸
app.use('/auth', authRouter)
app.use('/board', boardRouter)
app.use('/api', apiRouter)
app.use('/gallery', galleryRouter)


/*********** Error ***********/
app.use((req, res, next) => {
  next(err(404))
})

app.use((err, req, res, next) => {
  res.render('error', err) //err:전달받은 err객체
})


