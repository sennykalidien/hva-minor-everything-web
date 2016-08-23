'use strict'
describe('bundlinDate', function() {
    var $filter;
    beforeEach(function() {
        module('bundlin');

        inject(function(_$filter_){
            $filter = _$filter_;
        })
    });

    it('switches based on type',function() {
        var filter = $filter('bundlinDate');
        expect(filter("2015-04-20T11:36:44.987Z",'date')).to.equal('Apr 20, 2015');
        expect(filter("2015-04-20T11:36:44.987Z",'time')).to.equal('13:36');
        expect(filter("2015-04-20T11:36:44.987Z")).to.equal('13:36 - Apr 20, 2015');
    });

});