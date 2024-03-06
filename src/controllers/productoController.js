const fs = require('fs');
const path = require('path');

let data = require('../models/productData.json');

const productsFilePath = path.join(__dirname, '../models/productData.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const controller = {
  // Root - Show all products
	index: (req, res) => {
		const user = req.session.userLogin;
		if(user){
			res.redirect(`/user/${user.email}`);
		}
		res.render('home', {products,user});
		// res.render('home', {data})
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
			img:["monitorGamer-5.jpg"],
			title: req.body.title,
			brand: req.body.brand,
			price: req.body.price,
      		warranty: req.body.warranty,
			category: req.body.category,
      		stock: req.body.stock,
      		shipping: req.body.shipping,
      		specifications: [req.body.specifications]
		}
		data.push(newProduct)

		fs.writeFileSync(path.join(__dirname, `../models/productData.json`),
		JSON.stringify(data,null,4),
		{
			encoding: 'utf-8'
		}
		)
		res.render('/', {data})
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
     	let idFound = data.find(product => product.id == id);
		res.render(`editar-producto`, {idFound});
	},
  update: (req, res) => {
		let id = +req.params.id
		// let productUpdate = {
			// name : req.body.name}
		let {img,title,brand,price,warranty,category,stock,shipping,specifications} = req.body
		data.forEach(e => {
			if(e.id == id){
				//e.img = img;
				e.title = title;
				e.brand = brand;
				e.price = price;
				e.warranty = warranty;
				e.category= category;
				e.stock = stock === 'true' || false;
				e.shipping = shipping === 'true' || false;
				//e.specifications= specifications;
			}
		})
		fs.writeFileSync(path.join(__dirname, `../models/productData.json`),
		JSON.stringify(data,null,4),
		{
			encoding: 'utf-8'
		}
		)
		res.redirect('/')
},
destroy : (req, res) => {
  let id = +req.params.id // con este + obviamos la compraracion ===
  let updatedProducts = data.filter(e => e.id != id);

  fs.writeFileSync(path.join(__dirname, `../models/productData.json`),
  JSON.stringify(updatedProducts,null,4),
  {
    encoding: 'utf-8'
  }
  )
  res.redirect('/')
}

}
module.exports = controller;
