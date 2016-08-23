'use strict'

describe('Default Template Algorithm', function() {

    // TESTS

    /*
    http://lorefnon.me/plain-text-table/
    ┌──────────┬───────┐
    │ Article  │       │
    ├──────────┼───────┤
    │ Article  │Article│
    ├──────────┴───────┤
    │      Article     │
    ├──────────┬───────┤
    │Googlemaps│ Quote │
    │          ├───────┤
    │          │Article│
    ├──────────┴───────┤
    │       Vimeo      │
    └──────────────────┘
    */
    xit('Generates correct basic template structure', function() {
        return true;
        // var itemStructure = algorithm.run(generateItems(['article', 'article', 'article', 'article', 'googlemaps', 'quote', 'article', 'vimeo']))

        // expect(itemStructure).to.be.length(5)

        // expect(itemStructure[0]).property('structureName').eql('one-container')
        // expect(itemStructure[0]).property('itemNames').eql(['article-figureleft'])

        // expect(itemStructure[1]).property('structureName').eql('two-container')
        // expect(itemStructure[1]).property('itemNames').eql(['article', 'article'])

        // expect(itemStructure[2]).property('structureName').eql('one-container')
        // expect(itemStructure[2]).property('itemNames').eql(['article'])

        // expect(itemStructure[3]).property('structureName').eql('three-container')
        // expect(itemStructure[3]).property('itemNames').eql(['googlemaps', 'quote', 'article-noimage'])

        // expect(itemStructure[4]).property('structureName').eql('one-container')
        // expect(itemStructure[4]).property('itemNames').eql(['vimeo'])
    })

    // HELPERS

    var algorithm

    beforeEach(function() {
        module('bundlin')

        inject(function(DefaultTemplateAlgorithm) {
            algorithm = DefaultTemplateAlgorithm
        })
    })

    var generateItems = function(items) {
        return items.map(function(item) {
            return { type: item }
        })
    }

})
