"use strict";

module.exports = function(sequelize, DataTypes) {
  var Recommendation = sequelize.define("Recommendation");

  return Recommendation;
};