var express = require('express');
var models  = require('../models');
var router=express.Router();

/* GET books listing */
router.get('/', function(req, res, next){
	var books = models.Book.findAll()
		.then(function(mxResult){
			res.send(mxResult);
	}).catch(function(err){
		res.send(404);
	});
});


router.get("/book/:id", function(req, res, next){
	var book = models.Book.findAll({
		where:{
			id: req.params.id
		}
	}).then(function(myUser){
			res.send(myUser);
	});
});

module.exports = router;
