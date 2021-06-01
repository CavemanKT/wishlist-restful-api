var DataTypes = require("sequelize").DataTypes;
var _SequelizeMetum = require("./sequelize_metum");
var _WishlistItem = require("./wishlist_item");
var _Wishlist = require("./wishlist");

function initModels(sequelize) {
  var SequelizeMetum = _SequelizeMetum(sequelize, DataTypes);
  var WishlistItem = _WishlistItem(sequelize, DataTypes);
  var Wishlist = _Wishlist(sequelize, DataTypes);


  return {
    SequelizeMetum,
    WishlistItem,
    Wishlist,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
