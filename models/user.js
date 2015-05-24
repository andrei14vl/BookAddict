"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define(
    "User", 
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    }, 
    {
      classMethods: {
        associate: function(models) {
          User.hasOne(models.Preference);
          User.belongsToMany(models.Genre);
          User.belongsToMany(models.Book, {as: 'BookReview', through: models.Review});
          User.belongsToMany(models.Book, {as: 'Read', through: models.BookRead});
          User.belongsToMany(models.Book, {as: 'BookWish', through: models.Wishlist});
          User.belongsToMany(models.Book, {as: 'RecomendedBook', through: models.Recommendation});
        }
      }
   }
  );

  return User;
};