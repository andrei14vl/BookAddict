"use strict";

module.exports = function(sequelize, DataTypes) {
  var Book = sequelize.define(
    "Book", 
    {
      title: DataTypes.STRING,
      author: DataTypes.STRING,
      description: DataTypes.STRING,
      image: DataTypes.STRING
    }, 
    {
      classMethods: {
        associate: function(models) {
          Book.hasMany(models.ShopLink);
          Book.belongsToMany(models.Genre, {through: 'BookGenre'});
          Book.belongsToMany(models.User, {as: 'Reviewers', through: models.Review});
          Book.belongsToMany(models.User, {as: 'Readers', through: models.BookRead});
          Book.belongsToMany(models.User, {as: 'Buyer', through: models.Wishlist});
          Book.belongsToMany(models.User, {as: 'RecomendedFor', through: models.Recomendation});
        }
      }
    }
  );

  return Book;
};