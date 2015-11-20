//Client-Side app.js
//fix these as needed
angular.module('sampleApp', ['ngRoute', 'appRoutes', 'MainCtrl']);



var scrapeData = angular.module('App', []);

scrapeData.controller('TodoCtrl', function($scope, $http) {
  $http.get('output.json')
       .then(function(res){
          $scope.todos = res.data;                
        });
});