const controller = {
    renderProductCart :(req, res) => {
      res.render('productCart',{
        title:'Carrito de compras'
      })
    }
}
module.exports = controller;