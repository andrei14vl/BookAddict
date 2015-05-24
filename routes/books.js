var express = require('express');
var models  = require('../models');
var router=express.Router();

/* GET books listing */
router.get('/', function(req, res, next){
	models.Book.findAll()
		.then(function(books){
			res.send(books);
	}).catch(function(err){
		res.send(404);
	});
});


router.get("/book/:id", function(req, res, next){

	var book = models.Book.find({
		where:{
			id: req.params.id
		}
	}).then(function(book){
		var copyBook =book.toJSON();
		models.BookRead.count({
			where:{
				$and:[{
					bookId: req.params.id,
					userId: req.user.id	
				}]
				
			}
		}).then(function(number){
			if(number>0)
				copyBook.isRead=true;
			else
				copyBook.isRead=false;
			
			models.Review.count({
				where:{
					$and:[{
						bookId: req.params.id,
						userId: req.user.id	
					}]	
				}
			}).then(function(numberReviews){
				if(numberReviews>0)
					copyBook.isReviewed=true;
				else
					copyBook.isReviewed=false;

				models.Wishlist.count({
					where:{
						$and:[{
							bookId: req.params.id,
							userId: req.user.id	
						}]	
					}	
				}).then(function(numberWishlist){
					if(numberWishlist>0)
						copyBook.isInWishlist=true;
					else
						copyBook.isInWishlist=false;
					
					res.send(copyBook);
				}).catch(function(err){
					res.send(err.Message);
				})

			}).catch(function(err){
				res.send(err.Message);
			})

		}).catch(function(err){
			res.send(err.Message);
		});
	}).catch(function(err){
		res.send("Book not found");
	});
});

module.exports = router;
