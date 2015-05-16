var express = require('express');
var router = express.Router();
var models = require('../models');
/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});
/* POST user create */
router.post('/', function(req, res, next) {
	console.log(req.body);
	var users = models.User.create({
		username: req.body.username, 
		email: req.body.email, 
		password: req.body.password 
	}).then(function( user) {
		res.send(user);
	}).catch(function(err){
		res.send(404);
	});
});

module.exports = router;
