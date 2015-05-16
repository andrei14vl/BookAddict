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

module.exports = router;


// /** Add a new */
// router.post('/', function(req, res, next){
// 	console.log(req.body);

// 	var currentUser = request.user;
// 	var booksRead = currentUser.addRead(req.body)
// 	var book = models.Book.findAll({
// 		where{
// 			id: req.body.bookId
// 		}
// 	}).
// });


module.exports = router;