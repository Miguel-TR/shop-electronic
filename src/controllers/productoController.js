const controller = {
  renderCrearProducto :(req, res) => {
    res.render('crear-producto',{
      title:'Crear Producto'
    })
  }
}
module.exports = controller;