var express = require('express');
var models  = require('../models');
var router=express.Router();


/* Whishlist */

router.get('/user/:id', function(req, res, next){
	models.User.find({
		where:{
			id: req.params.id
		}
	}).then(function(user){
		var result = user.getBookWish().then(function(wishlist){
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

/* Deletes a book from the wishlist of the current user logged in*/
router.delete('/:id', function(req, res, next){
	var currentUser = req.user;

	if(!req.isAuthenticated())
		res.send(401);

	models.Wishlist.destroy({
		where:{
			$and: [{
				userId: req.user.id,
				bookId: req.params.id
			}, ]
		}
	}).then(function(mxResponse){
		res.send("Book deleted from wishlist");
	}).catch(function(err){
		res.send(err.Message);
	});
});




/* Route for adding a book to wishlist */
router.post('/', function(req, res, next){

	var currentUser = req.user;

	if(!req.isAuthenticated())
		res.send(401);

	var book = models.Book.find({
		where: {
			id: req.body.bookId
		}
	}).then(function(book){
		currentUser.addBookWish(book).then(function(whishlist){
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