var express = require('express'),
    router = express.Router();

module.exports = function (app) {
    app.use('/resources', router);
};

function renderSearch(req, res) {
    res.render('pages/resource/search/resourceSearch', {
        _meta: {
            hideSearchAction: true,
            hasTools: true,
            hideFooter: true,
            title: 'Resources'
        }
    });
}

router.get('/', function (req, res) {
    res.redirect(302, './resources/search');
});

router.get('/search', function (req, res) {
    renderSearch(req, res);
});