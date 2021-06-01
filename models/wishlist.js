const { Model } = require('sequelize')
const WishlistSchema = require('./schema/wishlist')
module.exports = (sequelize, DataTypes) => {
  class Wishlist extends Model {
    static associate(models) {
      Wishlist.WishlistItems = this.hasMany(models.WishlistItem)
    }
  }

  const { tableAttributes } = WishlistSchema(sequelize, DataTypes)
  Wishlist.init(tableAttributes, {
    sequelize,
    modelName: 'Wishlist',
  })

  return Wishlist
}