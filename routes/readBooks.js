var express = require('express');
var models  = require('../models');
var router=express.Router();


/* Get books read by an user */

router.get('/user/:id', function(req, res, next){
	var readBooks=models.User.findAll({
		where:{
			id: req.params.id
		}
	}).then(function(user){
		var result = user[0].getRead().then(function(booksRead){
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
	if(typeof currentUser==="undefined")
	{
		res.send("Only authenticated users can mark a book as read.");
	}
	console.log(req.body);
	var book = models.Book.findAll({
		where: {
			id: req.body.bookId
		}
	}).then(function(book){
		currentUser.addRead(book[0]).then(function(bookRead){
			res.send(bookRead);
		}).catch(function(err){
			res.send(err.Message);
		})
	})
});


module.exports = router;