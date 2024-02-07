const data = require('../models/productData.json');

const controller = {
  renderCrearProducto: (req, res) => {
    res.render('crear-producto', {
      title: 'Crear Producto'
    })
  },
  renderProductDetails: (req, res) => {
    const { id } = req.params;
    const selectedProduct = data.results.find(product => product.id === id);

    res.render('productDetail', {
      title: 'Detalle de producto',
      products: selectedProduct,
    })
  }
}
module.exports = controller;


