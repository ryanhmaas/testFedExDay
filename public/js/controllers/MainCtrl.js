//test
// public/js/controllers/MainCtrl.js
angular.module('sampleApp', []).controller('MainCtrl', function($scope, $http, $location) {
  var path = $location.path();
  console.log(path);
  $http.get('output.json').success(function(data) {
    $scope.games = data;
  });
    $scope.tagline = 'To the moon and back!';
});
