const path = require('path');
const fs = require('fs')
const usersFilePath = path.join(__dirname, '../models/user.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
function rememberUserMiddleware(req,res,next){
  if(req.cookies.user&&!req.session.userLogin){
    const email = req.cookies.user;
    const user =  users.find(u=>u.email==email);
    req.session.userLogin = user;
  }
  next();
}
module.exports = rememberUserMiddleware;