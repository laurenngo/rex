RexApp.controller('myRexCtrl', ['$scope','$http', '$mdToast', '$mdDialog', 'UserService', '$routeParams','$location', function($scope,$http,$mdToast,$mdDialog,UserService,$routeParams,$location){

  // console.log("MY REX CTRL LOADED");
  
  $scope.UserService = UserService;

  $scope.$watchCollection('UserService',function(){
    $scope.currentUser = UserService.currentUser;
    // console.log($scope.currentUser)
    if($scope.currentUser==false){
      $location.path('/')
    }
  });

	$scope.rexes = []


  $scope.showDialog =function($event) {
     // var parentEl = angular.element(document.body);
     $mdDialog.show({
       // parent: parentEl,
       // targetEvent: $event,
       templateUrl:'views/sendEmailModal.html',
       clickOutsideToClose: true,
       locals: {
         rex: $event
       },
       controller: 'sendEmailModalCtrl'
    });
  }

  $scope.showRex = function(){
    // console.log('ROUTE'+$routeParams)
    $http({
      method : 'GET',
      url : '/api/rex',
      params:{
        list_id: $routeParams.id
      }
    })
    .success(function(data, status) {
        $scope.rexes = data;
        // console.log('data',data)
     })
    .error(function(data, status) {
        alert("Error");
    });
  }

  $scope.listInfo = function(){
    $http({
      method:'GET',
      url:'/api/list',
      params:{
        id:$routeParams.id
      }
    })
    .success(function(data,status){
      $scope.listData = data;
      // console.log('LIST',data)
    })
    .error(function(data,status){
      alert("error")
    })
  }



  $scope.deleteRex = function(idx){
    $http.delete('/api/rex/'+idx)
    .success(function(data,status){
      $mdToast.show($mdToast.simple().content('Your Rex has been deleted.'))

      $scope.showRex();
    })
  }

  $scope.showRex();
  $scope.listInfo();

  $('.collapsible').collapsible({
      accordion : true // A setting that changes the collapsible behavior to expandable instead of the default accordion style
  });

}]);


