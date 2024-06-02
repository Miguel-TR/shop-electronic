const db = require('../../database/models');
const op = db.Sequelize.Op;

module.exports = {
    list: (req, res) => {
        db.Product
            .findAll()
            .then(products => {
                db.Category
                    .findAll()
                    .then(categories => {
                        let countByCategory = {};
                        let productsList = [];
                        for (let i = 0; i < categories.length; i++) {
                            let countProducts = 0;
                            for (let j = 0; j < products.length; j++) {
                                if (categories[i].id == products[j].id_category) {
                                    countProducts++;
                                }
                            }
                            countByCategory[categories[i].name] = countProducts;
                        }
                        for (let i = 0; i < products.length; i++) {
                            let categoriesList = [];
                            for (let j = 0; j < categories.length; j++) {
                                if (categories[j].id == products[i].id_category) {
                                    categoriesList.push(categories[j].name);
                                }
                            }

                            productsList.push({
                                "id": products[i].id,
                                "name": products[i].title,
                                "description": products[i].description,
                                "categories": categoriesList,
                                "detail": `/products/detail/${products[i].id}`
                            });

                        }

                        return res.status(200).json({
                            count: products.length,
                            countByCategory: countByCategory,
                            products: productsList,
                            status: 200
                        })
                    })
            })
    },

    detail: (req, res) => {
        db.Product
            .findByPk(req.params.id)
            .then(product => {
                db.Category
                    .findAll()
                    .then(categories => {
                        let categoriesList = [];
                        for (let j = 0; j < categories.length; j++) {
                            if (categories[j].id == product.id_category) {
                                categoriesList.push(categories[j].name);
                            }
                        }
                        return res.status(200).json({
                            "id": product.id,
                            "name": product.title,
                            "description": product.description,
                            "price": product.price,
                            "discount": product.discount,
                            "warranty": product.warranty,
                            "stock": product.stock,
                            "specifications": product.specifications,
                            "brand": product.brand,
                            "categories": categoriesList,
                            "image": `/img/${product.image}`,
                            status: 200
                        })
                    })
            })
    }


}

