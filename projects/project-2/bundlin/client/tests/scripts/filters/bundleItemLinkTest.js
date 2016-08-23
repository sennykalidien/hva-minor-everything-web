'use strict'
describe('addRefToUrl', function() {
    var $filter;
    beforeEach(function() {
        module('bundlin');

        inject(function(_$filter_){
            $filter = _$filter_;
        })
    });

    it('should construct api link from bundle sid and item sid',function() {
        var filter = $filter('bundleItemLink');
        expect(filter('1','2')).to.equal('/api/c/1/2');
        expect(filter('1')).to.equal('1');
    });

});