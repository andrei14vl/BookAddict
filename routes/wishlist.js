var express = require('express');
var models  = require('../models');
var router=express.Router();


/* Whishlist */

router.get('/user/:id', function(req, res, next){
	models.User.findAll({
		where:{
			id: req.params.id
		}
	}).then(function(user){
		var result = user[0].getBookWish().then(function(wishlist){
			if(typeof wishlist === "undefined")
				res.send(0);
			else
				res.send(wishlist);
		}).catch(function(err){
			res.send(err.Message);
		});
	}).catch(function(err){
		res.send(err.Message);
	});
});


/* Route for adding a book to wishlist */
router.post('/', function(req, res, next){

	var currentUser = req.user;

	var book = models.Book.findAll({
		where: {
			id: req.body.bookId
		}
	}).then(function(book){
		currentUser.addBookWish(book[0]).then(function(whishlist){
			if(typeof whishlist === "undefined")
				res.send(0);
			else
				res.send(whishlist);
		}).catch(function(err){
			res.send(err.Message);
		})
	})
});


module.exports = router;