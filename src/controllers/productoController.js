const fs = require('fs');
const path = require('path');

let data = require('../models/productData.json');

const productsFilePath = path.join(__dirname, '../models/productData.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
//CRUD-SQL
const db = require('../database/models/');
const Products = db.Product;
const Brands = db.Brand;
const Categories = db.Category;


const controller = {
  // Root - Show all products
	index: (req, res) => {
		const user = req.session.userLogin;
		if(user){
			res.redirect(`/user/${user.email}`);
		}
		//res.render('home', {products,user});
		// res.render('home', {data})
		Products
			.findAll()
			.then(products => {
				return res.render('home', { 
					title: 'Products List',
					products, user:null
				});
			})
			.catch(error => res.send(error));
	},

  create:(req,res)=>{	
	const user = req.session.userLogin;
		if(user){
    res.render('crear-producto',{user})
		}
		
  },

  store: (req, res) => {
	db.Product.create({
    //let newId = (data.at(-1).id)+1 //varias formas de poner un valor unico este te traer el ultimo y se le suma uno
		//let newProduct ={
			//id: newId,
			title: req.body.title,
			image: req.body?.image || 'default-image.png',
			description:req.body.description,
			price: req.body.price,
			discount : req.body.discount,
      		warranty: req.body.warranty,
      		stock: req.body.stock,
      		specifications: req.body.specifications,

			id_brand: req.body.brand,
			id_category: req.body.category,
		})
		.then(() => 
				res.redirect('/')
			)
            .catch(error => {
                console.error(error)
                res.status(500).send('Hubo un error al crear el producto');
            });
		  //sequelize
		//}
		//data.push(newProduct)

		// fs.writeFileSync(path.join(__dirname, `../models/productData.json`),
		// JSON.stringify(data,null,4),
		// {
		// 	encoding: 'utf-8'
		// }
		//)
		//res.render('/', {data})
  },
  

  detail: (req, res) => {
     /*let id  = +req.params.id;
     let products = data.find(product => product.id == id);
	 if (products) {
		res.render(`productDetail`, {products})
	}else{
		res.send('Se rompio todo')
	}*/
	Products.findByPk(req.params.id)
		.then(function(products){
			res.render('productDetail', {products})
		})
   },

   edit: (req, res) => {
		/*let id = +req.params.id // con este + obviamos la compraracion ===
     	let idFound = data.find(product => product.id == id);
		res.render(`editar-producto`, {idFound});*/
		db.Product.findByPk(req.params.id)
		.the(function(idFound){
			res.render('editar-producto', {idFound})
		})
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
	/*let id = +req.params.id // con este + obviamos la compraracion ===
	let updatedProducts = data.filter(e => e.id != id);

	fs.writeFileSync(path.join(__dirname, `../models/productData.json`),
	JSON.stringify(updatedProducts,null,4),
	{
		encoding: 'utf-8'
	}
	)
	res.redirect('/')*/
	Products.destroy({ where: { id: req.params.id }});

        res.redirect('/')
}
}
module.exports = controller;
