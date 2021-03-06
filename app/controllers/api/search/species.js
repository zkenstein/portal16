"use strict";

var apiConfig = rootRequire('app/models/gbifdata/apiConfig'),
    _ = require('lodash'),
    chai = require('chai'),
    expect = chai.expect,
    querystring = require('querystring'),
    request = require('requestretry');

async function get(key, depth) {
    depth = depth || 0;
    let baseRequest = {
        url: apiConfig.taxon.url + key,
        timeout: 30000,
        method: 'GET',
        json: true
    };
    let item = await request(baseRequest);
    if (item.statusCode > 299) {
        throw item;
    }
    if (depth > 0) {
        depth--;
        return expand(item.body, depth);
    } else {
        return item.body;
    }
}

async function expand(items){
    return items;
    //expect(node).to.be.an('object');
    //
    //let identifiers = node.identifiers || [],
    //    directoryParticipant = _.find(identifiers, {type: 'GBIF_PARTICIPANT'});
    //node.participantId = _.get(directoryParticipant, 'identifier');
    //return node;
}

async function query(query, options){
    options = options || {};
    query = query || {};

    let baseRequest = {
        url: apiConfig.taxonSearch.url + '?' + querystring.stringify(query),
        timeout: options.timeout || 30000,
        method: 'GET',
        json: true
    };

    let items = await request(baseRequest);
    if (items.statusCode > 299) {
        throw items;
    }
    return items.body;
}

module.exports = {
    get: get,
    query: query
};