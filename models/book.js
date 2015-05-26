"use strict";

module.exports = function(sequelize, DataTypes) {
  var Book = sequelize.define(
    "Book", 
    {
      title: DataTypes.STRING,
      author: DataTypes.STRING,
      description: DataTypes.STRING,
      image: DataTypes.STRING,
      misteryAndSuspicion: {
        type: DataTypes.INTEGER,
        defaultValue: 5
      },
      beautifulLanguage: {
        type: DataTypes.INTEGER,
        defaultValue: 5
      },
      complexRelationships: {
        type: DataTypes.INTEGER,
        defaultValue: 5
      },
      intriguingCharacters: {
        type: DataTypes.INTEGER,
        defaultValue: 5
      },
      immersiveStorylines: {
        type: DataTypes.INTEGER,
        defaultValue: 5
      },
      rating: {
        type: DataTypes.INTEGER,
        defaultValue: 1
      }
    }, 
    {
      classMethods: {
        associate: function(models) {
          Book.hasMany(models.ShopLink);
          Book.belongsToMany(models.Genre, {through: 'BookGenre'});
          Book.belongsToMany(models.User, {as: 'Reviewer', through: models.Review});
          Book.belongsToMany(models.User, {as: 'Reader', through: models.BookRead});
          Book.belongsToMany(models.User, {as: 'Buyer', through: models.Wishlist});
          Book.belongsToMany(models.User, {as: 'RecomendedFor', through: models.Recommendation});
        }
      }
    }
  );

  return Book;
};