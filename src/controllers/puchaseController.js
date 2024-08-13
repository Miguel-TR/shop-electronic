const db = require("../database/models");
const Op = db.Sequelize.Op;

const purchaseController = {
    list: (req, res) => {
        db.Purchase.findAll({
            include: ["products"],
        })
            .then((purchases) => {
                return res.send(purchases);
            })
            .catch((error) => console.error(error));
    },
    detail: (req, res) => {
        db.Purchase.findByPk(req.params.id, {
            include: [
                {
                    model: db.Product,
                    as: "products",
                    include: ["images"],
                },
            ],
        })
            .then((purchase) => {
                // return res.send(purchase);
                return res.render("purchases/purchaseDetail", { purchase });
            })
            .catch((error) => console.error(error));
    },
    create: (req, res) => {
        let purchaseCart = {
            id_user: req.session.user.id,
            products: req.session.cart.map((product) => ({
                id_product: product.id,
                amount: product.quantity,
                subtotal: product.price * product.quantity,
            })),
            total: req.session.cart.reduce(
                (acc, product) => acc + product.price * product.quantity,
                0
            ),
        };
        db.Purchase.create(purchaseCart)
            .then((purchase) => {
                db.ProductPurchase.bulkCreate(
                    purchaseCart.products.map((product) => ({
                        id_purchase: purchase.id,
                        id_product: product.id_product,
                        amount: product.amount,
                        subtotal: product.subtotal,
                    }))
                )
                    .then(() => {
                        req.session.cart = [];
                        return res.redirect("/profile");
                    })
                    .catch((error) => console.error(error));
            })
            .catch((error) => console.error(error));
    },
};

module.exports = purchaseController;
