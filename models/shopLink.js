"use strict";

module.exports = function(sequelize, DataTypes) {
  var ShopLink = sequelize.define(
  	"ShopLink", 
  	{
    	url: DataTypes.STRING,
  	}
  );

  return ShopLink;
};