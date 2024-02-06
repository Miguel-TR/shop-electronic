const path = require ('node:path');
const data = require('../models/productData.json');

const controller = {
	renderHome: (req,res) => {
	
	res.render('home',{
		title: 'Home',
		products: data.results 
	})
	}
}

module.exports = controller;
