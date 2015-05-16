var express = require('express');
var models  = require('../models');
var router=express.Router();

//router.use(express.bodyParser());


/* GET books listing */
router.get('/', function(req, res, next){
	var books = models.Book.findAll();
	console.log("BOOKS: "+JSON.stringify(books, null, 4));
	res.json(books);
});


router.get("/book/:id", function(req, res, next){
	var book = models.Book.findAll({
		where:{
			bookId: req.params.id
		}
	});
	if(!book)
	{
		res.statusCode=404;
		return res.send("Error 404: Book with ID "+req.params.id+" not found.");
	}
	res.json(book);
});

module.exports = router;
