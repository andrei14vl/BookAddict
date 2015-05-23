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
router.get('user/', function(req, res, next){
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


module.exports=router;

