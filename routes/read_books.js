var express = require('express');
var models  = require('../models');
var router=express.Router();


/* Get books read by an user */

router.get('/user/:id', function(req, res, next){
	var readBooks=models.User.findAll({
		where:{
			id: req.params.id
		}
	}).then(function(user){
		var result = user.Read;
		res.send(result);
	}).catch(function(err){
		res.send(404);
	});
});