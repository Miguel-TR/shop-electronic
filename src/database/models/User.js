module.exports = (sequelize, dataTypes) => {

  let alias = 'User';

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: dataTypes.STRING(50),
      allowNull: false
    },
    lastName: {
      type: dataTypes.STRING(50),
      allowNull: false
    },
    phone: {
      type: dataTypes.STRING(20),
      allowNull: false
    },
    email: {
      type: dataTypes.STRING(50),
      allowNull: false
    },
    password_user: {
      type: dataTypes.STRING(70),
      allowNull: false
    },
    rol: {
      type: dataTypes.STRING(30),
      allowNull: false
    },
    avatar: {
      type: dataTypes.STRING(200),
      allowNull: false
    },
  };

  let config = {
    tableName: 'users',
    timestamps: false
  };

  const User = sequelize.define(alias, cols, config);

  User.associate = function (models) {
    //   User.belongsTo(models.Roles, {
    //       as: 'roles',
    //       foreignKey: 'role_id'
    //   });

    User.hasMany(models.Reserva, {
      as: "reservas",
      foreignKey: "user_id"
    });
    User.hasMany(models.Purchase, {
      as: 'purchases',
      foreignKey: 'id_user'
    });

  };
    
  return User;

};