const db = require('../../database/models');

const purchaseAPI = {
    list: (req, res) => {
        db.Purchase.findAll()
        .then((purchases) =>{
            let response = {};
            if(purchases.length == 0){
                response = {
                    meta: {
                        status: 204,
                        total: purchases.length,
                        url: 'api/purchases'
                    },
                    data: purchases.map(purchase => {
                        return {
                            id: purchase.id,
                            total: purchase.total,
                            detail: 'api/purchases/' + purchase.id
                        }
                    })
                }
            } else {
                response = {
                    meta: {
                        status: 200,
                        total: purchases.length,
                        url: 'api/purchases'
                    },
                    data: purchases.map(purchase => {
                        return {
                            id: purchase.id,
                            total: purchase.total,
                            detail: 'api/purchases/' + purchase.id
                        }
                    })
                }
            }
            return res.status(200).json(response);
        })
    }
}

module.exports = purchaseAPI;