const controller = {
    renderProductDetail: (req, res) => {
        res.render('productDetail', {
            title: 'Detalle de producto'
        })
    }
}


module.exports = controller;