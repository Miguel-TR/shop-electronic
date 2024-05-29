//CRUD-SQL
const db = require('../database/models/');
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
		Products.findByPk(req.params.id)
			.then(function (products) {
				res.render('productDetail', { products })
			})
	},

	edit: (req, res) => {
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
									categoryName: categoryName
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
			.then(() => res.redirect('/detail/' + req.params.id))
	},

	destroy: (req, res) => {
		Products.destroy({ where: { id: req.params.id } });

		res.redirect('/')
	}
}


module.exports = controller;
