//CRUD-SQL
const db = require('../database/models');
const { Op, where } = require('sequelize');
const { title } = require('process');
const Products = db.Product;
const Brands = db.Brand;
const Categories = db.Category;


const controller = {
	// Root - Show all products
	index: (req, res) => {
		const user = req.session.userLogin;
		if (user) {
			res.redirect(`/user/${user.email}`);
		}

		Products
			.findAll()
			.then(products => {
				return res.render('home', {
					title: 'Products List',
					products, user: null
				});
			})
			.catch(error => res.send(error));
	},

	search: (req, res) => {
		Products.findAll(
			{
				include: [
					{ association: 'categories' },
					{ association: 'brands' }
				],
				where: { title: { [Op.like]: '%' + req.query.search + '%' } },
			})

			.then(products => {
				console.log(req.query.search)
				res.render('home', { products: products, user: null })
			})
			.catch(error => console.log(error));
	},

	filterByCategory: (req, res) => {
		Products.findAll(
			{
				include: [
					{ association: 'categories' },
					{ association: 'brands' }
				],
				// where: { id_category: { [Op.like]: req.params.category } },
				where: { id_category: req.params.category },
			})

			.then(products => {
				res.render('home', { products: products, user: null })
			})
			.catch(error => console.log(error));
	},

	create: (req, res) => {
		const user = req.session.userLogin;
		if (user) {
			res.render('crear-producto', { user })
		}
	},

	store: (req, res) => {
		db.Product.create({
			title: req.body.title,
			image: req.body?.image || 'default-image.png',
			description: req.body.description,
			price: req.body.price,
			discount: req.body.discount,
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
	},

	detail: (req, res) => {
		const user = req.session.userLogin;
		Products.findByPk(req.params.id)
			.then(function (products) {
				const user = req.session.userLogin;
				if (user) {
					res.render('productDetail', { products, user })
				}

			})
	},

	edit: (req, res) => {
		const user = req.session.userLogin;

		Products.findByPk(req.params.id)
			.then(function (idFound) {
				let brandName;
				let categoryName;
				Brands.findByPk(idFound.id_brand)
					.then(function (brand) {
						brandName = brand.name;
						Categories.findByPk(idFound.id_category)
							.then(function (category) {
								categoryName = category.name;
								res.render('editar-producto', {
									idFound: idFound,
									brandName: brandName,
									categoryName: categoryName,
									user: user
								})
							});
					});
			})
	},

	update: (req, res) => {
		let updateProduct = {
			title: req.body.title,
			image: req.body.image,
			description: req.body.description,
			price: req.body.price,
			discount: req.body.discount,
			warranty: req.body.warranty,
			stock: req.body.stock,
			specifications: req.body.specifications,

			id_brand: req.body.brand,
			id_category: req.body.category,
		};
		if (req.body && req.body.body) {
			updateProduct.image = req.file.body;
		}
		Products.update(updateProduct, {
			where: {
				id: req.params.id
			}
		})
			.then(() => res.redirect("/products/detail/" + req.params.id))
	},

	destroy: (req, res) => {
		Products.destroy({ where: { id: req.params.id } });

		res.redirect('/')
	}
}


module.exports = controller;
