var express = require('express');
var models  = require('../models');
var router=express.Router();


/* All the genres */

router.get('/', function(req, res, next){
	models.Genre.findAll()
		.then(function(genres){
			res.send(genres);
		}).catch(function(err){
			res.send(err.Message);
		})
});

/* Genres liked by an user */
router.get('/user', function(req, res, next){
	models.User.find({
		where:{
			id: req.user.id
		}
	}).then(function(user){
		if(typeof user === "undefined")
			res.send(0);
		user.getGenres().then(function(genres){
			res.send(genres);
		}).catch(function(err){
			res.send(err.Message);
		})
	}).catch(function(err){
		res.send(err.Message);
	})
});

/* User adds a new liked genre */
router.post('/', function(req, res, next){
	var currentUser = req.user;
	if(typeof currentUser==="undefined")
	{
		res.send("Only authenticated users can mark a genre as liked.");
	}

	models.Genre.find({
		where:{
			id: req.body.genreId
		}
	}).then(function(genre){
		currentUser.addGenre(genre).then(function(userGenre){
			res.send(userGenre);
		}).catch(function(err){
			res.send(err.Message);
		})
	}).catch(function(err){
		res.send(err.Message);
	})
});


router.delete('/:id', function(req, res, next){
	var currentUser = req.user;
	if(typeof currentUser==="undefined")
	{
		res.send("Only authenticated users can unlike genres.");
	}

	models.Genre.destroy({
		where:{
			$and: [{
				userId: req.user.id,
				genreId: req.params.id
			}, ]
		}
	}).then(function(mxResponse){
		res.send("Genre unliked.");
	}).catch(function(err){
		res.send(err.Message);
	});
});

module.exports=router;

