RexApp.controller('myRexCtrl', ['$scope','$http', '$mdToast', '$mdDialog', 'UserService', '$routeParams','$location', function($scope,$http,$mdToast,$mdDialog,UserService,$routeParams,$location){

  console.log("MY REX CTRL LOADED");
  
  $scope.UserService = UserService;

  $scope.$watchCollection('UserService',function(){
    $scope.currentUser = UserService.currentUser;
    console.log($scope.currentUser)
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
         // locals: {
         //   items: $scope.items
         // },
         controller: 'myRexCtrl'
      });
  }

  $scope.closeDialog = function(){
    console.log('clicked closeDialog()')
    $mdDialog.hide();
  }

  $scope.showRex = function(){
    console.log($routeParams)
    $http({
      method : 'GET',
      url : '/api/rex',
      params:{
        list_id: $routeParams.id
      }
    })
    .success(function(data, status) {
        $scope.rexes = data;
        console.log('data',data)
     })
    .error(function(data, status) {
        alert("Error");
    });
  }

  $scope.deleteRex = function(idx){
    $http.delete('/api/rex/'+idx)
    .success(function(data,status){
      $mdToast.show($mdToast.simple().content('Your Rex has been deleted.'))

      $scope.showRex();

      Rex.query(function(data){
        $scope.rexes = data;
      })
    })
  }

  $scope.showRex();

  $('.collapsible').collapsible({
      accordion : true // A setting that changes the collapsible behavior to expandable instead of the default accordion style
  });

  $scope.sendEmail = function(to,subject,text){

    console.log('sendEmail_F')
    var emailReq = {
      method: 'GET',
      url:'/email',
      params:{
        to:to,
        subject:subject,
        text:text
      }
    }

    console.log(emailReq);

    $http(emailReq).success(function(data){
      console.log(data);
    })

  }

}]);


