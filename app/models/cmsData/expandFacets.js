'use strict';

const facetTypeConfig = {
    type: {
        type: 'enum',
        translationPath: 'cms.contentType.',
        show: true
    },
    language: {
        type: 'enum',
        translationPath: 'language.',
        show: true
    },
    category_informatics: {
        type: 'id',
        translationPath: 'cms.filter.',
        show: false
    },
    category_data_use: {
        type: 'id',
        translationPath: 'cms.filter.',
        show: true
    },
    category_capacity_enhancement: {
        type: 'id',
        translationPath: 'cms.filter.',
        show: true
    },
    category_about_gbif: {
        type: 'id',
        translationPath: 'cms.filter.',
        show: true
    },
    category_audience: {
        type: 'id',
        translationPath: 'cms.filter.',
        show: true
    },
    category_purpose: {
        type: 'id',
        translationPath: 'cms.filter.',
        show: true
    },
    category_data_type: {
        type: 'id',
        translationPath: 'cms.filter.',
        show: false
    },
    category_resource_type: {
        type: 'id',
        translationPath: 'cms.contentType.',
        show: true
    },
    category_country: {
        type: 'id',
        translationPath: 'country.',
        show: true
    },
    category_topic: {
        type: 'id',
        translationPath: 'cms.filter.',
        show: true
    },
    category_tags: {
        type: 'id',
        translationPath: 'cms.filter.',
        show: false
    }
};

const resource_type = {
    '895': 'document',
    '987': 'presentation',
    '1010': 'tool',
    '1076': 'link'
};

function expandFacets(facets, __) {
    facets.forEach(function(facetType, i){
       let ftc = facetTypeConfig[facetType.field];
        facetType.tranlsatedLabel = __('cms.facet.' + facetType.field);
        facetType.counts.forEach(function(e){
            e.translatedLabel = __(ftc.translationPath + e.enum);
            if (ftc.type == 'enum') {
                e.key = e.enum;
            } else if (ftc.type == 'id') {
                e.key = e.id;
            }
        });
    });

    // merge category_resource_type filters with type filters
    var index_type, index_category_resource_type;
    facets.forEach(function(facet, fi){
        switch (facet.field) {
            case 'type':
                index_type = fi;
                break;
            case 'category_resource_type':
                index_category_resource_type = fi;
                break;
        }
        facet.counts.forEach(function(count, ci){
            // Strip type:resource filter for less confusion
            if (count.key == 'resource' || count.key == 'dataset') {
                facet.counts.splice(ci, 1);
            }
        });
    });
    facets[index_type].counts = facets[index_type].counts.concat(facets[index_category_resource_type].counts);
    facets.splice(index_category_resource_type, 1);

    // use enum as resource type key, and exclude dataset from content types
    facets.forEach(function(facet){
        facet.counts.forEach(function(count){
            switch (facet.field) {
                case 'type':
                    if ([895, 987, 1010, 1076].indexOf(count.key) !== -1) {
                        count.key = resource_type[count.key];
                    }
                    break;
            }
        });
    });
}

module.exports = expandFacets;