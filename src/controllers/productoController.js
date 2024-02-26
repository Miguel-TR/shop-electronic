const fs = require('fs');
const path = require('path');

let data = require('../models/productData.json');

const controller = {
  // Root - Show all products
	index: (req, res) => {
		res.render('productCart', {data})
	},

  create:(req,res)=>{
    res.render('crear-producto',{
			title:'Crear Producto'
		})
  },

  store: (req, res) => {
    let newId = (data.at(-1).id)+1 //varias formas de poner un valor unico este te traer el ultimo y se le suma uno
		let newProduct ={
			id: newId,
			title: req.body.title,
			brand: req.body.brand,
			price: req.body.price,
      garantia: req.body.garantia,
      stock: req.body.stock,
      envio: req.body.envio,
      especificaciones: req.body.especificaciones
		}
		data.push(newProduct)

		fs.writeFileSync(path.join(__dirname, `../data/productsDataBase.json`),
		JSON.stringify(data,null,4),
		{
			encoding: 'utf-8'
		}
		)
		res.render('productCart', {data})
  },

  detail: (req, res) => {
     let id  = +req.params.id;
     let selectedProduct = data.find(product => product.id == id);

        res.render('productDetail', {
          title: 'Detalle de producto',
          products: selectedProduct,
        })
   },
/*   edit: (req, res) => {
		let id = +req.params.id // con este + obviamos la compraracion ===
		let idFound = data.find(e => e.id == id);
		res.render(`product-edit-form`, {idFound});
	},
  update: (req, res) => {
		let id = +req.params.id
		// let productUpdate = {
			// name : req.body.name}
		let {title,brand,price,garantia,stock,envio,especificaciones} = req.body
		data.forEach(e => {
			if(e.id == id){
				e.title = title;
				e.brand = brand;
				e.price = price;
				e.garantia = garantia;
				e.stock = stock;
        e.envio = envio;
        e.especificaciones = especificaciones;
			}
		})
		fs.writeFileSync(path.join(__dirname, `../models/productsData.json`),
		JSON.stringify(data,null,4),
		{
			encoding: 'utf-8'
		}
		)
		res.redirect('/')
},
destroy : (req, res) => {
  let id = +req.params.id // con este + obviamos la compraracion ===
  products = data.filter(e => e.id != id)

  fs.writeFileSync(path.join(__dirname, `../models/productsData.json`),
  JSON.stringify(products,null,4),
  {
    encoding: 'utf-8'
  }
  )
  res.redirect('/')
}
*/
}
module.exports = controller;


