var express = require('express');
var models  = require('../models');
var router=express.Router();


/* Gets the preferences values of the logged in user.*/
router.get('/', function(req, res, next){
	models.Prefrence.find({
		where: {
			userId: req.user.id
		}
	}).then(function(preferences){
		res.send(preferences);
	}).catch(function(err){
		res.send(err.Message);
	});
});

/*Create or updates the user's preferences*/
router.post('/', function(req, res, next){
	models.Prefrence.create({
		misteryAndSuspicion: req.body.misteryAndSuspicion,
		beautifulLanguage: req.body.beautifulLanguage,
		complexRelationships: req.body.complexRelationships,
		intriguingCharacters: req.body.intriguingCharacters,
		immersiveStorylines: req.body.immersiveStorylines
	}).then(function(preference){
		user.addPreference(preference).then(function(){
			res.send(preference);
		}).catch(function(err){
			res.send(err.Message);
		})
	}).catch(res.send(err.Message));
});


module.exports = router;