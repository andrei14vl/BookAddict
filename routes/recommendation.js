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
	models.Books.findAll().then(function(books){
		currentUser.getPreferences().then(function(preferences){
			var recommend = knn(preferences, books, options);
			console.log("luck"+JSON.stringify(recommend, null, 4));
			res.send(recommend);
		}).catch(function(err){
			res.send(err.Message);
		});
	}).catch(function(err){
		res.send(err.Message);
	});

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
