const crypto = require('crypto');
const bcrypt = require('bcrypt');

let pass = '1234';
let pass2 = '1234';
let salt = '1234n93@#%12nkl';
//단순한 비밀번호 썼다하더라도 salt 추가해서 복잡하게 만듦
//해커들의 rainbow table 벗어나게 만듦
let sha512 = crypto.createHash('sha512').update(pass+salt).digest('base64');
sha512 = crypto.createHash('sha512').update(sha512).digest('base64');
let sha5122 = crypto.createHash('sha512').update(pass2+salt).digest('base64');
sha5122 = crypto.createHash('sha512').update(sha5122).digest('base64');
//salt하고 몇번씩 더 암호화함
console.log(sha512);
console.log(sha5122);
// 비밀번호 찾을 때는 암호화된 번호끼리 대조함

var hash = null;
const genPass = async (pass) => {
  hash = await bcrypt.hash(pass, 7);
  console.log(hash);
}

const comparePass = async (pass) => {
  var compare = await bcrypt.compare(pass, hash);
  console.log(compare);
}

genPass('1234');
setTimeout(() => {
  comparePass('12345');
},1000)