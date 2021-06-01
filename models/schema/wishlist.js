const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Wishlist', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Wishlists',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "Wishlists_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
