var express = require('express');
var models = require('../models');
var router = express.Router();

/* GET search book listing */
router.get('/:searchText', function(req, res, next) {
    models.Book.findAll({
        where: {
            $or: [{
                title: {
                    $like: '%' + req.params.searchText + '%'
                }
            }, {
                author: {
                    $like: '%' + req.params.searchText + '%'
                }
            }, {
                description: {

                    $like: '%' + req.params.searchText + '%'
                }
            }, ]
        }
    })
        .then(function(books) {
            res.send(books);
        }).catch(function(err) {
            res.send(404);
        });
});

module.exports = router;