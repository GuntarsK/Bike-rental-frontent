'use strict';

describe('myApp.bike module', function() {

    beforeEach(module('myApp.bike'));

    describe('bike controller', function(){

        it('should ....', inject(function($controller) {
            //spec body
            var bikeCtrl = $controller('BikeCtrl');
            expect(bikeCtrl).toBeDefined();
        }));

    });
});
