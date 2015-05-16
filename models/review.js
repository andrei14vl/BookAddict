"use strict";

module.exports = function(sequelize, DataTypes) {
  var Review = sequelize.define(
  		"Review", 
  		{
    		rating: DataTypes.INTEGER,
    		text: DataTypes.TEXT
  		}
  	);

  return Review;
};