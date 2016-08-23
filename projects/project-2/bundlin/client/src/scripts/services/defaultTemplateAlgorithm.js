app.factory('DefaultTemplateAlgorithm', function() {

    var structureTemplatePath = '/partials/bundle/default/structures';
    var itemTemplatePath = '/partials/bundle/default/items';
    var itemStructure = [];
    var remainingItems = [];
    var position = 1;

    var run = function(items) {
        itemStructure = [];
        position = 1;
        remainingItems = angular.copy(items);

        while (remainingItems.length > 0) {
            if (tryThreeContainer()) continue;
            if (tryTwoContainer()) continue;
            doOneContainer();
        }

        return itemStructure;
    };

    var tryThreeContainer = function() {
        if (notEnoughItems(3) || isPosition(1) || !previousIsNot('two-container') || !previousIsNot('three-container') || !previousIsNot('three-container-alt')) return false;

        if (itemsAreOfTypes(3, ['article', 'quote', 'twitter_tweet']) &&
            tweetsDontContainMedia(3) &&
            !articleMayBeWide(2) &&
            !articleMayBeWide(0) &&
            !(articleMayBeHigh(0) && articleMayBeHigh(1)) &&
            !(articleMayBeHigh(1) && articleMayBeHigh(2))) {

            if(articleMayBeHigh(0)) {
                addTemplate('three-container', [remainingItems[0].type, remainingItems[1].type, remainingItems[2].type]);
                return true;
            } else if(articleMayBeHigh(2)) {
                addTemplate('three-container-alt', [remainingItems[0].type, remainingItems[1].type, remainingItems[2].type]);
                return true;
            }
        }

        return false;
    };

    var tryTwoContainer = function() {
        if (notEnoughItems(2) || isPosition(1) || !previousIsNot('two-container') || !previousIsNot('three-container') || !previousIsNot('three-container-alt')) return false;

        var case1 = isPosition(2) && itemsAreNotOfTypes(1, ['article', 'quote']) && tweetsContainMedia(2) && itemsAreOfTypes(2, ['dribbble_shot', 'vine_video', 'twitter_tweet', 'article', 'quote']);
        var case2 = itemsAreOfTypes(1, ['article']) && !articleMayBeWide(1) && itemsAreOfTypes(1, ['dribbble_shot', 'vine_video', 'twitter_tweet'], 1) && tweetsContainMedia(2);
        var case3 = itemsAreOfTypes(2, ['article', 'quote', 'twitter_tweet']) && tweetsDontContainMedia(2);
        var case4 = case3 && itemsAreOfTypes(1, ['article', 'quote', 'twitter_tweet'], 1) && tweetsDontContainMedia(2) && articleMayBeWide(1);
        var case5 = case3 && itemsAreOfTypes(1, ['article']) && articleMayBeWide(0);
        var case6 = itemsAreOfTypes(2, ['soundcloud', 'dribbble_shot', 'vine_video', 'twitter_tweet', 'twitter_profile', 'article', 'quote']);

        if(case1 || case2 || case3 || case4 || case5 || case6) {
            if(itemsAreOfTypes(2, ['article']) && articleMayBeHigh(0) && articleMayBeHigh(1)) {
                addTemplate('two-container', ['article-high', 'article-high']);
                return true;
            } else {
                addTemplate('two-container', [remainingItems[0].type, remainingItems[1].type]);
                return true;
            }
        }

        return false;
    };

    var doOneContainer = function() {
        if (notEnoughItems(1)) return false;

        if(itemsAreOfTypes(1, ['article']) && !articleMayBeWide(0)) {
            addTemplate('one-container', ['article-figureleft']);
        } else if(itemsAreOfTypes(1, ['article']) && articleMayBeWide(0) && !isPosition(1)) {
            addTemplate('one-container', ['article']);
        } else {
            addTemplate('one-container', [remainingItems[0].type]);
        }

        return true;
    };

    // VALIDATORS

    var notEnoughItems = function(count) {
        return remainingItems.length < count;
    };

    var isPosition = function(requiredPos) {
        return position === requiredPos;
    };

    var previousIsNot = function(structure) {
        var lastStructure = itemStructure[itemStructure.length - 1];

        return structure !== lastStructure.structureName;
    };

    var itemsAreOfTypesInOrder = function(types) {
        var valid = true;

        _.each(types, function(type, index) {
            if (remainingItems[index].type !== type) valid = false;
        });

        return valid;
    };

    var itemsAreOfTypes = function(count, types, offset) {
        var valid = true;
        offset = offset || 0;

        for(var index = offset; index < count; index++) {
            if(types.indexOf(remainingItems[index].type) === -1) valid = false;
        }

        return valid;
    };

    var itemsAreNotOfTypes = function(count, types, offset) {
        var valid = true;
        offset = offset || 0;

        for(var index = offset; index < count; index++) {
            if(types.indexOf(remainingItems[index].type) > -1) valid = false;
        }

        return valid;
    };

    var tweetsContainMedia = function(count) {
        var valid = true;

        for(var index = 0; index < count; index++) {
            if(remainingItems[index].type === 'twitter_tweet' && (!remainingItems[index].fields.media || remainingItems[index].fields.media.length === 0)) valid = false;
        }

        return valid;
    };

    var tweetsDontContainMedia = function(count) {
        var valid = true;

        for(var index = 0; index < count; index++) {
            if(remainingItems[index].type === 'twitter_tweet' && (!remainingItems[index].fields.media || remainingItems[index].fields.media && remainingItems[index].fields.media.length > 0)) valid = false;
        }

        return valid;
    };

    var articleMayBeWide = function(itemIndex) {
        var item = remainingItems[itemIndex];
        var valid = true;
        if (item.type !== 'article' || !item.fields.picture || !item.fields.picture_aspect_ratio) valid = false;
        if (item.fields.picture_aspect_ratio < 1.5 ) valid = false;
        return valid;
    };

    var articleMayBeHigh = function(itemIndex) {
        var item = remainingItems[itemIndex];
        var valid = true;
        if (item.type !== 'article' || !item.fields.picture || !item.fields.picture_aspect_ratio) valid = false;
        if (item.fields.picture_aspect_ratio > 0.8 ) valid = false;
        return valid;
    };

    // HELPERS

    var addTemplate = function(structure, templates) {
        var structureFile = structureTemplatePath + '/' + structure + '.html?v=' + BLN_BUILD_TIMESTAMP;

        var templateFiles = templates.map(function(template) {
            position++;

            return itemTemplatePath + '/' + template + '.html?v=' + BLN_BUILD_TIMESTAMP;
        });

        remainingItems.splice(0, templates.length);

        itemStructure.push({
            structureName: structure,
            structureTemplate: structureFile,
            itemTemplates: templateFiles,
            itemNames: templates
        });
    };

    return {
        'run': run
    };

});
