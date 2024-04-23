module.exports = (sequelize, dataTypes) => {

  let alias = "Product";

  let cols = {
      id: {
          type: dataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      title: {
          type: dataTypes.STRING,
          allowNull: false
      },
      description: {
        type: dataTypes.STRING,
        allowNull: false
      },
      price: {
          type: dataTypes.DECIMAL,
          allowNull: false
      },
      discount: {
        type: dataTypes.FLOAT,
        allowNull: true
      },
      warranty: {
        type: dataTypes.STRING,
        allowNull: true
      },
      stock: {
        type: dataTypes.INTEGER,
        allowNull: false
      },
      specifications: {
        type: dataTypes.STRING,
        allowNull: true
      },
      id_brand: {
        type: dataTypes.INTEGER,
        allowNull: false
      },
      id_category: {
        type: dataTypes.INTEGER,
        allowNull: false
      },
  };

  let config = {
      tableName: "products",
      timestamps: false
  };

  const Product = sequelize.define(alias, cols, config);

  Product.associate = function(models) {
    // Asociación con la tabla de categorías
     Product.belongsTo(models.Category, {
         as: 'categories', 
         foreignKey: 'id_category' // La clave foránea que hace referencia a la categoría en la tabla de productos
    });

    // Asociación con la tabla de marcas
    Product.belongsTo(models.Brand, {
        as: 'brand', 
        foreignKey: 'id_brand' // La clave foránea que hace referencia a la marca en la tabla de productos
    });
};


  return Product;

};