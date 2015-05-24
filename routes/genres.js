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
	
	if(!req.isAuthenticated())
		res.send(401);

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
	
	if(!req.isAuthenticated())
		res.send(401);
	models.Genre.find({
		where:{
			id: req.params.is
		}
	}).then(function(genre){

		if(genre === null)
		{
			return res.send("Genre with ID "+genreId+" not found");

		}
		currentUser.removeGenre(genre).then(function(){
			res.send("Genre unliked.");
		}).catch(function(err){
			res.send(err.Message);
		});
	}).catch(function(err){
		res.send(err.Message);
	})
});

module.exports=router;

