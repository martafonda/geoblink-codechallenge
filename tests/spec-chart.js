describe('Chart', function(){
  beforeEach(module('chart'));
  describe('chartCtrl',function(){

    beforeEach(inject(function(_$controller_){
      $controller = _$controller_;
    }));

    describe('$scope.color', function(){

      it('returns true', function() {

        expect(true).toEqual(true);
      });

    });

  });

});
