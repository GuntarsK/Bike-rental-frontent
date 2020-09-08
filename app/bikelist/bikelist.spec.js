'use strict';

describe('myApp.bikelist module', function() {

    beforeEach(module('myApp.bikelist'));

    describe('bikelist controller', function(){

        it('should ....', inject(function($controller) {
            //spec body
            var bikelistCtrl = $controller('BikelistCtrl');
            expect(bikelistCtrl).toBeDefined();
        }));

    });
});
