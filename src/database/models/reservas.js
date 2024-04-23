module.exports = (sequelize, DataTypes)=>{
  let alias = "Reserva";

  let cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    units: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }
  
let config = {
  tableName: "reservas",
  timestamps: false
}
  const Reserva = sequelize.define(alias, cols, config);
  
  Reserva.associate = function(models){
    Reserva.belongsTo(models.Product, {
      as: "products" ,
      foreignKey: 'id_product' 
    });
    Reserva.belongsTo(models.Shopping_cart, { 
      as: "shopping_carts",
      foreignKey: 'id_shopping_cart' 
    });
  };
  
  return Reserva;
};