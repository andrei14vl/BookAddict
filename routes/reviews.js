var express = require('express');
var models  = require('../models');
var router=express.Router();

/* A book's reviews */
router.get('/book/:id', function(req, res, next){
	var result = models.Review.findAll({
		where:{
			bookId: req.params.id
		}
	}).then(function(reviews){
		res.send(reviews);
	}).catch(function(err){
		res.send(err.Message);
	});
});


/* Current logged in user adds a book review*/
router.post('/', function(req, res, next){
	var currentUser=req.user;
	if(typeof currentUser==="undefined")
	{
		res.send("Only authenticated users can add books reviews.");
	}

	models.Book.find({
		where:{
			id:req.body.bookId 
		}
	}).then(function(book){
		currentUser.addBookReview(
			book, 
			{
				rating: req.body.rating,
				text: req.body.text
			}
		).then(function(review){
			if(typeof review === "undefined")
				res.send(0);
			else
				res.send(review);
		}).catch(function(err){
			res.send(err.Message);
		})
	}).catch(function(err){
		res.send(err.Message);
	})
});


router.delete('/:id', function(req, res, next){

	if(typeof req.user==="undefined")
	{
		res.send("Only authenticated users can remove their reviews.");
	}

	models.Review.destroy({
		where: {
			$and: [{
				userId: req.user.id,
				reviewId: req.params.id
			}]
		}
	}).then(function(mxResponse){
		res.send("Review deleted.");
	}).catch(function(err){
		res.send(err.Message);
	})

});


module.exports = router;