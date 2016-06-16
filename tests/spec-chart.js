describe('Chart', function(){
  beforeEach(module('chart'));

  //Testing Controller
  describe('chartCtrl',function(){

    beforeEach(inject(function(_$controller_){
      $controller = _$controller_;
    }));

    //Testing method color
    describe('$scope.color', function(){

      it('sets color #5Ab1BB to the area 0 of the chart', function() {
        var $scope = {};
        var controller = $controller('chartCtrl', { $scope: $scope });

        index = 0;
        expect($scope.color(index)).toEqual('#5Ab1BB');
      });

      it('sets color #F7DD72 to the area 1 of the chart', function() {
        var $scope = {};
        var controller = $controller('chartCtrl', { $scope: $scope });

        index = 1;
        expect($scope.color(index)).toEqual('#F7DD72');
      });

      it('sets color #225E65 to the area 2 of the chart', function() {
        var $scope = {};
        var controller = $controller('chartCtrl', { $scope: $scope });

        index = 2;
        expect($scope.color(index)).toEqual('#225E65');
      });

    });
  });

  //Testing Directive
  describe('Radar Chart directive', function() {
    var $compile, $rootScope, element, $scope;

    beforeEach(module('chart'));
    beforeEach(module('templates/radarChart.html'));

    beforeEach(inject(function($compile, $rootScope){
      $scope = $rootScope.$new();
      element = angular.element("<radar-chart></radar-chart>");
      $compile(element)($rootScope);
      $rootScope.$digest();
    }));

    it('Replaces the element with the appropriate content', function() {
      expect(element.html()).toContain("chart-container");
    });
  });

});
