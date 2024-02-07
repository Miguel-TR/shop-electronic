const path = require('node:path');
const data = require('../models/productData.json');

const controller = {
	renderHome: (req, res) => {

		res.render('home', {
			title: 'E-Shop',
			products: data.results
		})
	}
}

module.exports = controller;
