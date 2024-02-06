const controller = {
  renderLogin :(req, res) => {
    res.render('login',{
      title:'Iniciar Sesion'
    })
  },
  renderRegister:(req, res) => {
    res.render('register',{
      title:'Crear Cuenta'
    })
    
  }
}
module.exports = controller;