const { DataTypes } = require('sequelize');
const sequelize = require('../app.js');
const Marca = require('./marca.js');
const Categoria = require('./categoria.js');

const Producto = sequelize.define('Producto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  discount: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  warranty: {
    type: DataTypes.STRING,
    allowNull: true
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  specifications: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

Producto.belongsTo(Marca, { foreignKey: 'id_brand' });
Producto.belongsTo(Categoria, { foreignKey: 'id_category' });

module.exports = Producto;
