'use strict';

var angular = require('angular');

(function () {
    'use strict';

    angular
        .module('portal')
        .factory('Species', function ($resource, env) {
            return $resource(env.dataApi + 'species/:id', null, {
                    'query': {
                        method: 'GET',
                        isArray: false
                    }
                }
            );
        })
        .factory('SpeciesSynonyms', function ($resource, env) {
            return $resource(env.dataApi + 'species/:id/synonyms', null, {
                    'query': {
                        method: 'GET',
                        isArray: false
                    }
                }
            );
        })
        .factory('SpeciesChildren', function ($resource, env) {
            return $resource(env.dataApi + 'species/:id/children', null, {
                    'query': {
                        method: 'GET',
                        isArray: false
                    }
                }
            );
        })
        .factory('SpeciesParents', function ($resource, env) {
            return $resource(env.dataApi + 'species/:id/parents', null, {
                    'query': {
                        method: 'GET',
                        isArray: true
                    }
                }
            );
        })
        .factory('SpeciesSearch', function ($resource) {
            return $resource('/api/species/search', null, {
                    'query': {
                        method: 'GET',
                        isArray: false,
                        cancellable: true
                    }
                }
            );
        })
        .factory('SpeciesMatch', function ($resource, env) {
            return $resource(env.dataApi + 'species/match', null, {
                    'query': {
                        method: 'GET',
                        isArray: false
                    }
                }
            );
        })
        .factory('SpeciesSuggest', function ($resource, env) {
            return $resource(env.dataApi + 'species/suggest', null, {
                    'query': {
                        method: 'GET',
                        isArray: true
                    }
                }
            );
        });

})();

