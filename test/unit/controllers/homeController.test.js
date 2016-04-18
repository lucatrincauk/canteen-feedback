describe('HomeController', function(){

	beforeEach(module('CanteenFeedback', function($provide) {
	  $provide.value("weekFeedbacks", function() {	return sinon.spy();	});
	  $provide.value("todaysFeedbacks", function() {	return sinon.spy();	});
	  $provide.value("weekRatings", function() { return sinon.spy(); });
	  $provide.value("todaysRating", function() {	return sinon.spy();	});
	}));
	beforeEach(module('AppTemplate'));

	var $controller;

  beforeEach(inject(function(_$controller_, _weekFeedbacks_){
    $controller = _$controller_;
		weekFeedbacks = _weekFeedbacks_;

  }));

	beforeEach(function() {
		$scope = {};
		$scope.$watch = sinon.spy();
		$controller = $controller('HomeController', {$scope: $scope});
	});

	it('test', function(){
		expect(weekFeedbacks).not.to.be.undefined;

	});

});
