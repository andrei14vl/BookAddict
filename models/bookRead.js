"use strict";

module.exports = function(sequelize, DataTypes) {
  var BookRead = sequelize.define(
  	"BookRead", 
  	{
    	date: DataTypes.DATE
  	}
  );

  return BookRead;
};