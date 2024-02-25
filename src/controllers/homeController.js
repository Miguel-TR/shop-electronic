const fs = require('fs');
const path = require('node:path');
//const data = require('../models/productData.json');

const productsFilePath = path.join(__dirname, '../models/productData.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		const productsFilePath = path.join(__dirname, '../models/productData.json');
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));	
		res.render('home', {products});
		// res.render('home', {
		// 	title: 'E-Shop',
		// 	products: products.results
		//})
	},
 	search: (req, res) => {
 		// capturar informacion de queryparams
 		const busqueda = req.query.keywords;

 		//Extrar productos que matcheen con la busqueda
 		const productBuscado = products.filter((product) => product.name.toLowerCase().includes(busqueda.toLowerCase()));
 		//Vista
 		res.render('results', {busqueda, productBuscado})
 	},
 }

module.exports = controller;
