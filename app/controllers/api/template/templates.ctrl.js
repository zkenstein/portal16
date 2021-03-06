var express = require('express'),
    helper = rootRequire('app/models/util/util'),
    router = express.Router(),
    minute = 60, //cache goes by seconds
    hour = minute * 60,
    day = hour * 24;

module.exports = function (app) {
    app.use('/api/template', router);
};

router.get('/*.html', function (req, res, next) {
    res.header('Cache-Control', 'public, max-age=' + day * 100);
    next();
});

router.get('/footer.html', function (req, res, next) {
    helper.renderPage(req, res, next, {}, 'shared/layout/partials/footer/footer');
});

router.get('/search.html', function (req, res, next) {
    helper.renderPage(req, res, next, {}, 'shared/layout/partials/navigation/search/search');
});

router.get('/search/eventResult.html', function (req, res, next) {
    helper.renderPage(req, res, next, {}, 'pages/resource/key/event/eventSearchResult');
});

router.get('/search/dataUseResult.html', function (req, res, next) {
    helper.renderPage(req, res, next, {}, 'pages/resource/key/dataUse/dataUseSearchResult');
});

router.get('/search/newsResult.html', function (req, res, next) {
    helper.renderPage(req, res, next, {}, 'pages/resource/key/news/newsSearchResult');
});

router.get('/search/projectResult.html', function (req, res, next) {
    helper.renderPage(req, res, next, {}, 'pages/resource/key/project/projectSearchResult');
});

router.get('/search/programmeResult.html', function (req, res, next) {
    helper.renderPage(req, res, next, {}, 'pages/resource/key/programme/programmeSearchResult');
});

router.get('/search/literatureResult.html', function (req, res, next) {
    helper.renderPage(req, res, next, {}, 'pages/resource/key/literature/literatureSearchResult');
});

router.get('/search/toolResult.html', function (req, res, next) {
    helper.renderPage(req, res, next, {}, 'pages/resource/key/tool/toolSearchResult');
});

router.get('/search/articleResult.html', function (req, res, next) {
    helper.renderPage(req, res, next, {}, 'pages/resource/key/article/articleSearchResult');
});

router.get('/search/datasetResult.html', function (req, res, next) {
    helper.renderPage(req, res, next, {}, 'pages/dataset/datasetSearchResult');
});

router.get('/search/speciesResult.html', function (req, res, next) {
    helper.renderPage(req, res, next, {}, 'pages/species/speciesSearchResult');
});

router.get('/search/publisherResult.html', function (req, res, next) {
    helper.renderPage(req, res, next, {}, 'pages/publisher/publisherSearchResult');
});

router.get('/publisher/key.html', function (req, res, next) {
    helper.renderPage(req, res, next, {}, 'pages/publisher/key/publisherKey.template.nunjucks');
});

router.get('/publisher/datasets.html', function (req, res, next) {
    helper.renderPage(req, res, next, {}, 'pages/publisher/key/datasets/publisherDatasets.template.nunjucks');
});

router.get('/publisher/installations.html', function (req, res, next) {
    helper.renderPage(req, res, next, {}, 'pages/publisher/key/installations/publisherInstallations.template.nunjucks');
});

router.get('/search/countryResult.html', function (req, res, next) {
    helper.renderPage(req, res, next, {}, 'pages/participant/countrySearchResult');
});

router.get('/country/summary.html', function (req, res, next) {
    helper.renderPage(req, res, next, {}, 'pages/participant/country/summary');
});

router.get('/country/about.html', function (req, res, next) {
    helper.renderPage(req, res, next, {}, 'pages/participant/country/about');
});

router.get('/country/publishing.html', function (req, res, next) {
    helper.renderPage(req, res, next, {}, 'pages/participant/country/publishing');
});

router.get('/country/participant.html', function (req, res, next) {
    helper.renderPage(req, res, next, {}, 'pages/participant/country/participant');
});


router.get('/species/key.html', function (req, res, next) {
    helper.renderPage(req, res, next, {}, 'pages/species/key2/speciesKey.template.nunjucks');
});

router.get('/dataset/key.html', function (req, res, next) {
    helper.renderPage(req, res, next, {}, 'pages/dataset/key2/datasetKey.template.nunjucks');
});

router.get('/dataset/taxonomy.html', function (req, res, next) {
    helper.renderPage(req, res, next, {}, 'pages/dataset/key2/taxonomy/datasetTaxonomy.template.nunjucks');
});

router.get('/dataset/project.html', function (req, res, next) {
    helper.renderPage(req, res, next, {}, 'pages/dataset/key2/project/datasetProject.template.nunjucks');
});

router.get('/dataset/stats.html', function (req, res, next) {
    helper.renderPage(req, res, next, {}, 'pages/dataset/key2/stats/datasetStats.template.nunjucks');
});

router.get('/dataset/activity.html', function (req, res, next) {
    helper.renderPage(req, res, next, {}, 'pages/dataset/key2/activity/datasetActivity.template.nunjucks');
});

router.get('/dataset/constituents.html', function (req, res, next) {
    helper.renderPage(req, res, next, {}, 'pages/dataset/key2/constituents/datasetConstituents.template.nunjucks');
});

router.get('/site/footer.html', function (req, res, next) {
    helper.renderPage(req, res, next, {}, 'shared/layout/partials/footer/footer.nunjucks');
});

router.get('/thegbifnetwork/participantDetails.html', function (req, res, next) {
    helper.renderPage(req, res, next, {}, 'pages/theGbifNetwork/participantDetails.html');
});

router.get('/thegbifnetwork/participantTable.html', function (req, res, next) {
    helper.renderPage(req, res, next, {}, 'pages/theGbifNetwork/participantsDigest/participantTable.html');
});

router.get('/thegbifnetwork/regionalReps.html', function (req, res, next) {
    helper.renderPage(req, res, next, {}, 'pages/theGbifNetwork/participantsDigest/regionalReps.html');
});


