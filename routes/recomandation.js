var express = require('express');
var router = express.Router();
var models  = require('../models');


router.get('/:id', function(req, res, next) {
  	var users = models.User.findAll({
		where:{
			id: req.params.id
		}
	}).then(function(myUser){

			var result = myUser[0].getRead();
			res.send(result);

	});
});


module.exports = router;
