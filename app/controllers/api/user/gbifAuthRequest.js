"use strict";

const credentials = rootRequire('config/credentials').directory,
    appKey = credentials.appKey,
    secret = credentials.secret,
    request = require('requestretry'),
    chai = require('chai'),
    expect = chai.expect,
    apiConfig = rootRequire('app/models/gbifdata/apiConfig'),
    crypto = require('crypto'),
    NEWLINE = '\n';

async function authenticatedRequest(options) {
    //https://github.com/gbif/gbif-common-ws/blob/master/src/main/java/org/gbif/ws/security/GbifAuthService.java
    expect(options).to.be.an('object');
    expect(['GET', 'POST', 'PUT', 'DELETE'], 'request method').to.include(options.method);
    expect('url').to.be.a('string');
    if (options.method == 'POST' || options.method == 'PUT') {
        expect(options.canonicalPath, 'canonicalPath').to.be.a('string');
        expect(options.body, 'POST/PUT body').to.be.an('object');
    }

    let requestOptions = {
        maxAttempts: 5,   // (default) try 5 times
        retryDelay: 5000,  // (default) wait for 5s before trying again
        retryStrategy: request.RetryStrategies.HTTPOrNetworkError, // (default) retry on 5xx or network errors
        fullResponse: true
    };
    requestOptions.method = options.method;
    requestOptions.url = options.url;
    requestOptions.json = options.body;
    if (requestOptions.method == 'GET') {
        requestOptions.json = true;
    }

    var headers = createHeader(options);
    signHeader(requestOptions.method, headers);
    requestOptions.headers = headers;

    let response = await request(requestOptions);
    return response;
}

function createHeader(options) {
    let headers = {};
    headers['x-url'] = options.canonicalPath || options.url;
    headers['x-gbif-user'] = options.userName || appKey;
    if (options.method == 'POST' || options.method == 'PUT') {
        headers['Content-MD5'] = crypto.createHash('md5').update(JSON.stringify(options.body)).digest("base64");
    }
    return headers;
}

function signHeader(method, headers) {
    var stringToSign = method + NEWLINE + headers['x-url'];
    if (headers['Content-MD5']) {
        stringToSign += NEWLINE + 'application/json' + NEWLINE + headers['Content-MD5'];
    }
    if (headers['x-gbif-user']) {
        stringToSign += NEWLINE + headers['x-gbif-user'];
    }
    var signature = crypto.createHmac('sha1', secret).update(stringToSign).digest('base64');
    headers.Authorization = 'GBIF ' + appKey + ':' + signature;
}

module.exports = {
    authenticatedRequest: authenticatedRequest
};