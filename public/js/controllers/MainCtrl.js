//test
// public/js/controllers/MainCtrl.js
angular.module('sampleApp', []).controller('MainCtrl', function($scope, $http) {

  $http.get('../../output.json').success(function(data) {
    $scope.games = data;
  });
    $scope.tagline = 'To the moon and back!';
});
