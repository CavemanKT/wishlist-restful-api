const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('WishlistItem', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    importance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    received: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    WishlistId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'WishlistItems',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "WishlistItems_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
