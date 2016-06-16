describe('Content Block', function(){
  beforeEach(module('contentBlock'));

  //Testing Controller
  describe('ContentBlockCtrl',function(){

    beforeEach(inject(function(_$controller_,  _$httpBackend_, contentBlock){
      $controller = _$controller_;
      service_name = contentBlock;
      $httpBackend =  _$httpBackend_;
    }));

    //Testing requesting URL
    describe('request URL ', function(){
      var data = "hola";
      it('should have a getData function', function() {
        expect(angular.isFunction(service_name.getData)).toBe(true);
      });

      it('getData function should return data object if http request is successful', function() {
        var expectedData = data;
        var url = './server/data.json?callback=json_callback&format=json&method=contentBlock.getData';
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
        var url = './server/data.json?callback=json_callback&format=json&method=contentBlock.getData';

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
  describe('Content Block directive', function() {
    var $compile, $rootScope, element, $scope;

    beforeEach(module('contentBlock'));
    beforeEach(module('templates/contentBlock.html'));

    beforeEach(inject(function($compile, $rootScope){
      $scope = $rootScope.$new();
      element = angular.element("<content-block></content-block>");
      $compile(element)($rootScope);
      $rootScope.$digest();
    }));

    it('Replaces the element with the appropriate content', function() {
      expect(element.html()).toContain("population");
    });
  });

});
