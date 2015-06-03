RexApp.controller('searchRexCtrl', ['$scope', '$http', function($scope,$http){
	console.log('Search Controller Loaded!')

	$scope.yelpSearch = function(){

		var yelpReq = {
			method: 'GET',
			url: '/yelp',
			params: {
				location:$scope.searchLocation,
				term:$scope.searchTerm
			}
		}

		console.log(yelpReq)

	$http(yelpReq).success(function(data){
		console.log(data);
		$scope.results = data.data.businesses;
		$scope.total = data.data.total;
	})

   }

   


}])