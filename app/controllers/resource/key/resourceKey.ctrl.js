"use strict";

let express = require('express'),
    _ = require('lodash'),
    helper = rootRequire('app/models/util/util'),
    router = express.Router(),
    resource = require('./resourceKey');

module.exports = function (app) {
    app.use('/', router);
};

router.get('/data-use2/:id/:title?\.:ext?', function (req, res, next) {
    prose(req, res, next, 'data-use', 'pages/resource/key/dataUse/dataUseStory');
});

router.get('/datause2/:id/:title?\.:ext?', function (req, res, next) {
    prose(req, res, next, 'data-use', 'pages/resource/key/dataUse/dataUseStory');
});

router.get('/event2/:id/:title?\.:ext?', function (req, res, next) {
    prose(req, res, next, 'event', 'pages/resource/key/event/event');
});

router.get('/news2/:id/:title?\.:ext?', function (req, res, next) {
    prose(req, res, next, 'news', 'pages/resource/key/news/newsStory');
});

router.get('/tool2/:id/:title?\.:ext?', function (req, res, next) {
    prose(req, res, next, 'tool', 'pages//resource/key/tool/tool');
});

router.get('/programme2/:id/:title?\.:ext?', function (req, res, next) {
    prose(req, res, next, 'programme', 'pages/resource/key/programme/programme');
});

router.get('/project2/:id/:title?\.:ext?', function (req, res, next) {
    prose(req, res, next, 'project', 'pages/resource/key/project/project');
});


function prose(req, res, next, type, template){
    let entry = req.params.id,
        entryTitle = req.params.title,
        preview = entryTitle === '_preview';// too see the preview of an item (using the preview api) call an item with /[id]/_preview
    //search for items with that id. search is used instead of entry get as search allow for includes of assets etc
    resource.searchContentful(entry, 2, preview, res.locals.gb.locales.current)
        .then(function (results) {
            //check if there is any results. if not, then the item do not exists
            if (results.total == 0) {
                next();
                return;
            } else if(_.get(results, 'sys.type') !== 'Array') {
                next(Error('contentful query failed'));
                return;
            }

            let contentItem = resource.getFirstContentItem(results),
                itemTitle = contentItem.main.fields.title || '',
                slugTitle = resource.getSlug(itemTitle);
            resource.mapLegacyData(contentItem);
            resource.removeUnresovable(contentItem.main.fields, contentItem.resolved);

            contentItem._meta = {
                title: preview ? 'preview' : itemTitle,
                slugTitle: slugTitle
            };

            //if not a preview, then make sure the title is a part of the url by redirecting if necessary
            if (!preview) {
                if (slugTitle != entryTitle){
                    res.redirect(302, res.locals.gb.locales.urlPrefix + '/'+ type +'2/' + entry + '/' + slugTitle);
                    return;
                }
            }
            helper.renderPage(req, res, next, contentItem, template);
        })
        .catch(function(err){
            next(err);
        });
}
