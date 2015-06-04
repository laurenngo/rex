RexApp.controller('navCtrl', ['$scope', '$rootScope', '$mdSidenav', 'UserService', '$mdToast', '$location', function($scope, $rootScope, $mdSidenav, UserService, $mdToast, $location){

  console.log('NAV CTRL LOADED')

  $scope.UserService = UserService;
  $scope.$watchCollection('UserService',function(){
          $scope.currentUser = UserService.currentUser;
          
    
      console.log('NAV LOG'+UserService.currentUser)
    })


   $scope.openLeftMenu = function() {
    console.log("MENU FIRING")
    $mdSidenav('left').toggle();
  };


  $scope.logOut = function(){
    
    UserService.logout(function(err,data){
      $location.path('/');
      $mdToast.show($mdToast.simple().content('You have been logged out!'));
      console.log('LOGGED OUT')
    })
    // confirm('This will log you out');
  }

  $scope.showMyRex = function(){
    console.log('showMyRex')
    $('#myRexModal').openModal();
  }

  
}])