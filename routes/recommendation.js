var express = require('express');
var router = express.Router();
var models  = require('../models');
var knn = require('alike');

router.get('/', function(req, res, next){
	var currentUser = req.user;
	var options = {
		k: 20,
		weights:{
			misteryAndSuspicion: 0.2,
			beautifulLanguage: 0.2,
			complexRelationships: 0.2,
			intriguingCharacters: 0.2,
			immersiveStorylines: 0.2	
		},
		debug: 1
	};

	models.Genre.findAll({
		attributes: ['id']
	}).then(function(allGenres){
		currentUser.getGenres({
			attributes: ['id']
		}).then(function(userGenres){
			var genres=null;
			if(userGenres===null)
				genres=allGenres;
			else
				genres=userGenres;

			console.log("\nAm intrat\n");
			models.Book.findAll({
				
			}).then(function(books){
				models.Preference.find({
					where:{
						userId: currentUser.id
					}
				}).then(function(preferences){

				    console.log("cautam preferinte");
				    console.log(preferences);
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
					console.log("\nStage two\n");
					var recommend = knn(preferences, books, options);
					
					books.sort(function(a,b){
						var firstCoeff = (a.misteryAndSuspicion * preferences.misteryAndSuspicion
							         + a.beautifulLanguage * preferences.beautifulLanguage
							         + a.complexRelationships * preferences.complexRelationships
							         + a.intriguingCharacters * preferences.intriguingCharacters
							         + a.immersiveStorylines * preferences.immersiveStorylines);
						var secondCoeff = (b.misteryAndSuspicion * preferences.misteryAndSuspicion
							         + b.beautifulLanguage * preferences.beautifulLanguage
							         + b.complexRelationships * preferences.complexRelationships
							         + b.intriguingCharacters * preferences.intriguingCharacters
							         + b.immersiveStorylines * preferences.immersiveStorylines);
						var ratingCoeff;
						if (a.rating>b.rating)
							ratingCoeff = -1;
						else if (a.rating < b.rating)
							ratingCoeff = 1;
						else 
							ratingCoeff = 0;

						if (firstCoeff > secondCoeff)
							return -1;
						else if (firstCoeff < secondCoeff)
							return 1;
						else 
							return ratingCoeff;

					});
					/*console.log(books);*/
					res.send(books.slice(0,20));
				}).catch(function(err){
					res.send(err.Message);
				});
			}).catch(function(err){
				res.send(err.Message);
			});

		}).catch(function(err){
			res.send(err.Message);
		});		
	}).catch(function(err){
		res.send(err.Message);
	});

});
/*
models.Book.findAll().then(function(books){
		console.log("\nCe caut pe aici\n");
		models.Preference.find({
			where:{
				userId: currentUser.id
			}
		}).then(function(preferences){
		
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
			
			books.sort(function(a,b){
						return ((a.misteryAndSuspicion * preferences.misteryAndSuspicion
							         + a.beautifulLanguage * preferences.beautifulLanguage
							         + a.complexRelationships * preferences.complexRelationships
							         + a.intriguingCharacters * preferences.intriguingCharacters
							         + a.immersiveStorylines * preferences.immersiveStorylines)
								> (b.misteryAndSuspicion * preferences.misteryAndSuspicion
							         + b.beautifulLanguage * preferences.beautifulLanguage
							         + b.complexRelationships * preferences.complexRelationships
							         + b.intriguingCharacters * preferences.intriguingCharacters
							         + b.immersiveStorylines * preferences.immersiveStorylines));

			});

			res.send(books);
		}).catch(function(err){
			res.send(err.Message);
		});
	}).catch(function(err){
		res.send(err.Message);
	});


});
*/



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
