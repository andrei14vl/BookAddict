var express = require('express');
var router = express.Router();
var models  = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
	var users = models.User.findAll();

	//console.log("Users: "+JSON.stringify(users, null, 4));
	res.json(users);
});

router.get('/user/:id', function(req, res, next) {
  res.send('respond with a resource' . id);
});

module.exports = router;
