var express = require('express');
var router = express.Router();
var models  = require('../models');



router.get('/:id', function(req, res, next){
	models.Book.findAll()
		.then(function(books){
			res.send(books);
	}).catch(function(err){
		res.send(404);
	});
});


router.get('/test/:id', function(req, res, next){
	var readBooks=models.User.findAll({
		where:{
			id: req.params.id
		}
	}).then(function(myUser){
		console.log("usersusersuserruser");
		console.log(myUser.Id);
		var result = myUser[0].getRead().then(function(booksRead){
			if(typeof result === "undefined")
				res.send(0);
			else{
				var recomandBook = booksRead[0].Id;
				console.log("sadasdasdasdas");
				res.send(booksRead);
			}



		}).catch(function(err){
			res.send(err.Message);
		});
	}).catch(function(err){
		res.send(err.Message);
	});
});



module.exports = router;
