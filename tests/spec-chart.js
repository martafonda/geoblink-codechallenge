describe('Chart', function(){
  beforeEach(module('chart'));

  //Testing Controller
  describe('chartCtrl',function(){

    beforeEach(inject(function(_$controller_,  _$httpBackend_, chart){
      $controller = _$controller_;
      service_name = chart;
      $httpBackend =  _$httpBackend_;
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

    //Testing requesting URL
    describe('request URL ', function(){
      var data = "hola";
      it('should have a getData function', function() {
        expect(angular.isFunction(service_name.getData)).toBe(true);
      });

      it('getData function should return data object if http request is successful', function() {
        var expectedData = data;
        var url = './server/data.json?callback=json_callback&format=json&method=chart.getData';
        $httpBackend.expectGET(url)
          .respond(expectedData);

        var actualResult;
        service_name.getData().then(function(response) {
          actualResult = response.data;
        });
        $httpBackend.flush();

        expect(actualResult).toEqual(expectedData);
      });

      it('should demonstrate using when (200 status)', inject(function($http) {
        var $scope = {};
        var url = './server/data.json?callback=json_callback&format=json&method=chart.getData';

        $http.get(url)
          .success(function(data, status, headers, config) {
            $scope.fooData = data;
          });

        $httpBackend
          .when('GET', function(url) {
            return url.indexOf(url) !== -1;
          })
          .respond(200, { data: 'value' });

        $httpBackend.flush();

        expect($scope.fooData.data).toEqual("value");
      }));
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
