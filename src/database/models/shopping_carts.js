module.exports = (sequelize, DataType) => {
  let alias = "Shopping_cart";

  let cols = {
      id: {
          type: DataType.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      id_user: {
        type: DataType.INTEGER,
    }
  };

  let config = {
      tableName: "shopping_carts",
      timestamps: false
  };

  const Shopping_cart = sequelize.define(alias, cols, config);

//   const User = require('./User');
Shopping_cart.associate = function(models){
    Shopping_cart.belongsTo(models.User, {
      as: "user",
      foreignKey: 'id_user' 
  });
}

  return Shopping_cart;
};
