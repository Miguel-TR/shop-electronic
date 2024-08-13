module.exports = (sequelize, dataTypes) => {
  let alias = "Purchase";

  let cols = {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    total: {
      type: dataTypes.DECIMAL,
      allowNull: false,
    },
    id_user: {
      type: dataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  };

  let config = {
    table: "purchases",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: false,
  };

  const Purchase = sequelize.define(alias, cols, config);

  Purchase.associate = function (models) {
    Purchase.belongsToMany(models.Product, {
      as: "products",
      through: models.ProductPurchase,
      foreignKey: "id_purchase",
      otherKey: "id_product",
      timestamps: false,
    });
    Purchase.belongsTo(models.User, {
      as: "user",
      foreignKey: "id_user",
    });
  };

  return Purchase;
};
