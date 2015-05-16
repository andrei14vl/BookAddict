"use strict";

module.exports = function(sequelize, DataTypes) {
  var Wishlist = sequelize.define("Wishlist");

  return Wishlist;
};