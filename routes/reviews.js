var express = require('express');
var models  = require('../models');
var router=express.Router();

/* A book's reviews */
router.get('/book/:id', function(req, res, next){
	
	models.Review.findAll({
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

	if(!req.isAuthenticated())
		res.send(401);

	models.Book.find({
		where:{
			id:req.body.bookId 
		}
	}).then(function(book){
		BookReview.count({
			where:{
				bookId:req.body.bookId
			}
		}).then(function(number){
			var properties = {
				misteryAndSuspicion: (book.misteryAndSuspicion * number + req.body.misteryAndSuspicion)/(number+1),
				beautifulLanguage: (book.beautifulLanguage * number + req.body.beautifulLanguage)/(number+1),
				complexRelationships: (book.complexRelationships * number + req.body.complexRelationships)/(number+1),
				intriguingCharacters: (book.intriguingCharacters * number + req.body.intriguingCharacters)/(number+1),
				immersiveStorylines: (book.immersiveStorylines * number + req.body.immersiveStorylines)/(number+1)
			};
			book.updateAttributes({
				misteryAndSuspicion: properties.misteryAndSuspicion,
				beautifulLanguage: properties.beautifulLanguage,
				complexRelationships: properties.complexRelationships,
				intriguingCharacters: properties.intriguingCharacters,
				immersiveStorylines: properties.immersiveStorylines
			}).then(function(response){
				currentUser.addBookReview(
					book, 
					{
						rating: req.body.rating,
						text: req.body.text,
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
		}).catch(function(err){
			res.send(err.Message);
		})
		
	}).catch(function(err){
		res.send(err.Message);
	})
});


router.delete('/:id', function(req, res, next){

	if(!req.isAuthenticated())
		res.send(401);

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