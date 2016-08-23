'use strict'
describe('addRefToUrl', function() {
    var $filter;
    beforeEach(function() {
        module('bundlin');

        inject(function(_$filter_){
            $filter = _$filter_;
        })
    });

    it('should display the first word of a sentence',function() {
        var filter = $filter('addRefToUrl');
        expect(filter('http://www.test.nl')).to.equal('http://www.test.nl?ref=bundlin');
        expect(filter('http://www.test.nl?test=test123')).to.equal('http://www.test.nl?ref=bundlin&test=test123');
        expect(filter('http://www.test.nl?test=test123&bla=test')).to.equal('http://www.test.nl?ref=bundlin&test=test123&bla=test');
    });

});