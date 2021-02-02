module.exports = () => {
  return (req, res, next) => {
    req.app.locals.user = req.session.user || {}
    //login되야만 user정보가 담김, 아니면 빈 객체
    //pug(view engine이 쓰는 전역변수)
    next();
  }
}