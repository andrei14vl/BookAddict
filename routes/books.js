var express = require('express');
var models  = require('../models');
var router=express.Router();

//router.use(express.bodyParser());


/* GET books listing */
router.get('/', function(req, res, next){
	models.Book.findAll()
		.then(function(books){
			res.send(books);
	}).catch(function(err){
		res.send(404);
	});
});


router.get("/book/:id", function(req, res, next){
	var book = models.Book.findAll({
		where:{
			id: req.params.id
		}
	}).then(function(book){
		res.send(book[0]);
	}).catch(function(err){
		res.send("Book not found");
	});
});

module.exports = router;
