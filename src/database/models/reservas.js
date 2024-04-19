const { DataTypes } = require('sequelize');
const sequelize = require('../app.js');
const Producto = require('./producto.js');
const Carrito = require('./carrito.js');

const Reservas = sequelize.define('Reservas', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  units: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

Reservas.belongsTo(Producto, { foreignKey: 'id_product' });
Reservas.belongsTo(Carrito, { foreignKey: 'id_shopping_cart' });

module.exports = Reservas;
