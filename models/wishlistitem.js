const { Model } = require('sequelize')
const WishlistItemSchema = require('./schema/wishlist_item')
module.exports = (sequelize, DataTypes) => {
  class WishlistItem extends Model {
    static associate(models) {
      WishlistItem.Wishlist = this.belongsTo(models.Wishlist)
    }
  }

  const { tableAttributes } = WishlistItemSchema(sequelize, DataTypes)
  WishlistItem.init(tableAttributes, {
    sequelize,
    modelName: 'WishlistItem',
  })

  return WishlistItem
}