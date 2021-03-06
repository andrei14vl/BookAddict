"use strict";

module.exports = function(sequelize, DataTypes) {
  var Genre = sequelize.define(
      "Genre", 
      {
        name: DataTypes.STRING,
      }, 
      {
        classMethods: {
          associate: function(models) {
            Genre.belongsToMany(models.Book, {through: 'BookGenre'});
            Genre.belongsToMany(models.User);

          }
        }
      }
  );

  return Genre;
};