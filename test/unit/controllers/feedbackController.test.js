describe('FeedbackController', function(){

	beforeEach(module('CanteenFeedback', function($provide) {
	  $provide.value("feedbacks", mockedTodaysFeedbacks);
	}));
	beforeEach(module('AppTemplate'));

	var $controller,
			mockedTodaysFeedbacks,
			Ratings,
			$state;

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

  beforeEach(inject(function(_$controller_, _Ratings_, _$state_){
    $controller = _$controller_;
		Ratings = _Ratings_;
		$state = _$state_;
  }));

	beforeEach(function() {
		$scope = {};
		$scope.$emit = sinon.spy();
		$controller = $controller('FeedbackController', {$scope: $scope});
	});

	it('assigns feedbacks data to the scope', function(){
		expect(typeof $scope.feedbacks).to.equal('object');
	});

	it('assigns ratings data to the scope', function(){
		expect(typeof $scope.ratings).to.equal('object');
	});

	it('updates the Ratings service when a new feedback is added', function(){
		Ratings.addRating = sinon.spy();
		$scope.feedbacks.$add = sinon.stub().returns(true);
		$scope.addFeedback();
		expect(Ratings.addRating).to.have.been.called;
	});

	it('changes route after saving the feedback', function(){
		Ratings.addRating = sinon.spy();
		$scope.feedbacks.$add = sinon.stub().returns(true);
		$scope.addFeedback();
		expect($state.go).to.have.been.called;
	});

	it('calculates the total score for a feedback', function(){
		$scope.newFeedback = {
			'rating': 4.9,
			'staff': 3.1,
			'portion': 1.2,
			'money': 5
		};

		$scope.calculateTotal();
		expect($scope.total).to.equal(7.64);
	});

});
