var express = require('express');
var models  = require('../models');
var router=express.Router();


/* Get books read by an user */

router.get('/user/:id', function(req, res, next){
	models.User.find({
		where:{
			id: req.params.id
		}
	}).then(function(user){
		var result = user.getRead().then(function(booksRead){
			if(typeof result === "undefined")
				res.send(0);
			else
				res.send(booksRead);
		}).catch(function(err){
			res.send(err.Message);
		});
	}).catch(function(err){
		res.send(err.Message);
	});
});


/* Route for adding a book to readBooks */
router.post('/', function(req, res, next){

	var currentUser = req.user;
	
	if(!req.isAuthenticated())
		res.send(401);

	models.Book.find({
		where: {
			id: req.body.bookId
		}
	}).then(function(book){
		currentUser.addRead(book).then(function(bookRead){
			res.send(bookRead);
		}).catch(function(err){
			res.send(err.Message);
		})
	})
});


module.exports = router;