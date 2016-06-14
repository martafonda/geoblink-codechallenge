(function(){
var contentBlock = angular.module('contentBlock',[]);

//service
contentBlock.factory('contentBlock', ['$http', function ($http) {
  return {
      getData: function () {
        var url = './server/data.json?callback=json_callback';
        return $http.get(url, {
          params: {
            method: 'contentBlock.getData',
            format:'json'
          }
        });
      }
    }
}]);

//Controller
contentBlock.controller('ContentBlockCtrl',['$scope','contentBlock',
  function ($scope, contentBlock) {
    $scope.datas = [];


    contentBlock.getData()
      .success(function (res) {
        if (res.error) {
          throw new Error(res.message);
        } else {
          $scope.datas = res;
        }
      });
  }
]);

//Directive
contentBlock.directive('contentBlock', function () {
    return {
      templateUrl: '../templates/contentBlock.html',
      restrict: 'E'
    };
});
})();
