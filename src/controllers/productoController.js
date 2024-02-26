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
			img:"monitorGamer-5.jpg",
			title: req.body.title,
			brand: req.body.brand,
			price: req.body.price,
      		warranty: req.body.warranty,
			category: req.body.category,
      		stock: req.body.stock,
      		shipping: req.body.shipping,
      		specifications: req.body.specifications
		}
		data.push(newProduct)

		fs.writeFileSync(path.join(__dirname, `../models/productData.json`),
		JSON.stringify(data,null,4),
		{
			encoding: 'utf-8'
		}
		)
		res.render('productCart', {data})
  },

  detail: (req, res) => {
     let id  = +req.params.id;
     let products = data.find(product => product.id == id);
	 if (products) {
		res.render(`productDetail`, {products})
	}else{
		res.send('Se rompio todo')
	}
   },
   edit: (req, res) => {
		let id = +req.params.id // con este + obviamos la compraracion ===
		let idFound = data.find(e => e.id == id);
		res.render(`editar-producto`, {idFound});
	},
  update: (req, res) => {
		let id = +req.params.id
		// let productUpdate = {
			// name : req.body.name}
		let {title,brand,price,warranty,stock,shipping,specifications} = req.body
		data.forEach(e => {
			if(e.id == id){
				e.title = title;
				e.brand = brand;
				e.price = price;
				e.warranty = warranty;
				e.stock = stock;
				e.shipping = shipping;
				e.specifications= specifications;
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
  products = data.filter(e => e.id != id);

  fs.writeFileSync(path.join(__dirname, `../models/productData.json`),
  JSON.stringify(data,null,4),
  {
    encoding: 'utf-8'
  }
  )
  res.redirect('/')
}

}
module.exports = controller;
