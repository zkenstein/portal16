'use strict';

var baseConfig = require('../../../config/config');

var baseUrl = baseConfig.cmsApi;
var apiConfig = {
    base: {
        url: baseUrl
    },
    news: {
        url: baseUrl + 'news/'
    },
    dataset: {
        url: baseUrl + 'dataset/'
    },
    dataUse: {
        url: baseUrl + 'data-use/'
    },
    event: {
        url: baseUrl + 'event/'
    },
    resource: {
        url: baseUrl + 'resource/'
    },
    participant: {
        url: baseUrl + 'gbif_participant/'
    },
    page: {
        url: baseUrl + 'page/'
    },
    search: {
        url: baseUrl + 'search/'
    },
    urlLookup: {
        url: baseUrl + 'url-lookup/'
    }
};

module.exports = Object.freeze(apiConfig);