var express = require('express'),
    search = require('../../../models/search/search'),
    i18n = require("i18n"),
    router = express.Router();

module.exports = function (app) {
    app.use('/', router);
};

router.get('/search', function (req, res) {
    var searchString = req.query.q;
    search.search(searchString, function(results){
        res.render('pages/search/search', {
            __hideSearchAction: true,
            results: results,
            query: searchString,
            locale: req.getLocale() == 'en' ? '' : req.getLocale()
        });
    });
});


