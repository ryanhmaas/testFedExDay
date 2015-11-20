//test
// public/js/controllers/MainCtrl.js
angular.module('sampleApp', []).controller('MainCtrl', function($scope, $http) {

var scrapeData = angular.module('scrapeData', []);
  $http.get('output.json')
       .then(function(res){
          $scope.output = res.data;                
        });

    $scope.tagline = 'To the moon and back!';
});
