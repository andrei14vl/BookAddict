var express = require('express');
var router = express.Router();
var models  = require('../models');


router.get('/user/:id', function(req, res, next) {
  	var users = models.User.findAll({
		where:{
			id: req.params.id
		}
	}).then(function(myUser){
			res.send(myUser);

	});
});


module.exports = router;
