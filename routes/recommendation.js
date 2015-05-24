var express = require('express');
var router = express.Router();
var models  = require('../models');
var knn = require('alike');


router.get('/', function(req, res, next){
	var currentUser = req.user;
	var options = {
		k: 50,
		weights:{
			misteryAndSuspicion: 0.2,
			beautifulLanguage: 0.2,
			complexRelationships: 0.2,
			intriguingCharacters: 0.2,
			immersiveStorylines: 0.2	
		}
	};
	models.Book.findAll().then(function(books){

		models.Preference.find({
			where:{
				userId: currentUser.id
			}
		}).then(function(preferences){
			console.log("aici?");
			if(preferences == null)
			{
				preferences={
					misteryAndSuspicion: 5,
					beautifulLanguage: 5,
					complexRelationships: 5,
					intriguingCharacters: 5,
					immersiveStorylines: 5
				};
			}
			var recommend = knn(preferences, books, options);
			console.log("luck"+JSON.stringify(preferences, null, 4));
			res.send(recommend);
		}).catch(function(err){
			res.send(err.Message);
		});
	}).catch(function(err){
		res.send(err.Message);
	});
	// models.Book.findAll()
	// 	.then(function(books){
	// 		res.send(books);
	// }).catch(function(err){
	// 	res.send(404);
	// });
});




router.get('/test/:id', function(req, res, next){
	models.User.findAll({
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
