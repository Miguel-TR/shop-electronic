const { DataTypes } = require('sequelize');
const sequelize = require('../app.js');
const Usuario = require('./usuario.js');

const Carrito = sequelize.define('Carrito', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
});

Carrito.belongsTo(Usuario, { foreignKey: 'id_user' });

module.exports = Carrito;
