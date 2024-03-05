function guestMiddleware(req,res,next){
  if(req.session.userLogin){
    next();
  }else{
    res.send('Esta pagina es para invitados')
  }
}
module.exports = guestMiddleware