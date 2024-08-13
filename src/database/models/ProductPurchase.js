module.exports = (sequelize, dataTypes) => {
    let alias = 'ProductPurchase';

    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        amount: {
            type: dataTypes.TINYINT.UNSIGNED,
            allowNull: false
        },
        subtotal: {
            type: dataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        id_product: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        id_purchase: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    };

    let config = {
        tableName: 'product_purchase',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    };

    const ProductPurchase = sequelize.define(alias, cols, config);

    return ProductPurchase;
};