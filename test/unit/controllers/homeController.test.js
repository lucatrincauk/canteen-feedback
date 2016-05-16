describe('HomeController', function(){

	beforeEach(module('CanteenFeedback', function($provide) {
	  $provide.value("weekFeedbacks", mockedWeekFeedbacks);
	  $provide.value("todaysFeedbacks", mockedTodaysFeedbacks);
	  $provide.value("weekRatings", mockedWeekRatings);
	  $provide.value("todaysRating", mockedTodaysRating);
	}));
	beforeEach(module('AppTemplate'));

	var $controller,
			mockedWeekFeedbacks,
			mockedTodaysFeedbacks,
			mockedTodaysRating,
			mockedWeekRatings;

	mockedWeekFeedbacks = [{
		"-KHts4QRzCTYRLMcjag5": {
				"money":1.6,
				"option":"vegetarian",
				"portion":3.6,
				"rating":1.6,
				"staff":3.5
		},
		"-AHts4QRzCTYRLMcjag5": {
			"money":0.6,
			"option":"jp",
			"portion":0.7,
			"rating":0.9,
			"staff":1.3
		},
		"$id":"2016-05-16"
	},
	{
		"-CHts4QRzCTYRLMcjag5": {
				"money":1.6,
				"option":"vegetarian",
				"portion":3.6,
				"rating":1.6,
				"staff":3.5
		},
		"$id":"2016-05-17"
	}];

	mockedTodaysFeedbacks = [{
		"-KHts4QRzCTYRLMcjag5": {
				"money":1.6,
				"option":"vegetarian",
				"portion":3.6,
				"rating":1.6,
				"staff":3.5
		},
		"-AHts4QRzCTYRLMcjag5": {
			"money":0.6,
			"option":"jp",
			"portion":0.7,
			"rating":0.9,
			"staff":1.3
		},
		"$id":"2016-05-16"
	}];

	mockedTodaysRating = [{
		"quantity":2,
		"total":6.52,
		"$id":"2016-05-16"
	}];

	mockedWeekRatings = [{
		"quantity":2,
		"total":6.52,
		"$id":"2016-05-16",
		"rating":3.26,
	},{
		"quantity":1,
		"total":3.98,
		"$id":"2016-05-17",
		"rating":3.98,
	}];

  beforeEach(inject(function(_$controller_, _weekFeedbacks_){
    $controller = _$controller_;
		weekFeedbacks = _weekFeedbacks_;

  }));

	beforeEach(function() {
		$scope = {};
		$scope.$watch = sinon.spy();
		$controller = $controller('HomeController', {$scope: $scope});
	});

	it('assigns feedbacks data to the scope', function(){
		expect(typeof $scope.feedbacks).to.equal('object');
		expect(typeof $scope.todaysFeedbacks).to.equal('object');
	});

	it('assigns ratings data to the scope', function(){
		expect(typeof $scope.ratings.today).to.equal('object');
		expect(typeof $scope.ratings.week).to.equal('object');
	});

	it('retrieves a list of days and assigns it to the scope', function(){
		expect(typeof $scope.weekDays).to.equal('object')
		expect(typeof $scope.weekDaysUnformatted).to.equal('object')
	});

	it('retrieves a formatted date of today', function(){
		expect(typeof $scope.todaysDate).to.equal('string')
	});

});
