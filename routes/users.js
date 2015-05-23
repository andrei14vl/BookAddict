var express = require('express');
var router = express.Router();
var models  = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next){
	var users = models.User.findAll()
		.then(function(myUsers){
			res.send(myUsers);

	});
});

router.get('/:id', function(req, res, next) {
  	var users = models.User.find({
		where:{
			id: req.params.id
		}
	}).then(function(myUser){
			res.send(myUser);

	});
});

router.post('/', function(req, res, next) {
	console.log(req.body);
	var users = models.User.create({
		username: req.body.username, 
		email: req.body.email, 
		password: req.body.password 
	}).then(function( user) {
		res.send(user);
	}).catch(function(err){
		res.send(err.Message);
	});
});


module.exports = router;
