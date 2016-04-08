describe('HomeController', function(){
	var controller, scope, weeksFeedback;

	beforeEach(module('CanteenFeedback'));
	beforeEach(module('AppTemplate'));

	beforeEach(inject(function($rootScope, _weeksFeedback_){
		scope = $rootScope.$new();
		controller = _$controller_('HomeController', {
			$scope: scope
		});
		weeksFeedback = _weeksFeedback_
	}));

	it('calls the method doSomethingAsync()', function(){
		expect(weeksFeedback.poo).to.eq(true);

	});

});
