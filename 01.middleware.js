const express = require('express');
const app = express();

app.listen(3000);

//4번방식
const middleware4 = (req, res, next) => {
  req.user4 = 'eunjeong4';
  next();
}

app.get('/'), (req, res, next) => {
  middleware4(req, res, next);
  res.send(`<h1>${req.user4}</h1>`)
}