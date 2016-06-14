(function(){
var chart = angular.module('chart', []);

//service
chart.factory('chart', ['$http', function ($http) {
  return {
    getData: function () {
      var url = './server/data.json?callback=json_callback';
      return $http.get(url, {
        params: {
          method: 'chart.getData',
          format:'json'
        }
      });
    },
    classNameDenomination: function(result, element){
      if(element.variables.is_reference){
        result.push({
          className: "Reference Area"
        });
      }else{
        result.push({
          className : "Compared Area " + result.length
        });
      }
    },
    arrayConstruction: function(position,element){
      position.axes = [
              {axis: "population", value: element.variables.indexes.population},
              {axis: "unemployment", value: element.variables.indexes.unemployment},
              {axis: "comercial_activity", value: element.variables.indexes.commercial_activity},
              {axis: "wealth", value: element.variables.indexes.wealth},
              {axis: "traffic", value: element.variables.indexes.traffic},
              {axis: "foreigners", value: element.variables.indexes.foreigners},
              {axis: "dependency_rate", value: element.variables.indexes.dependency_rate},
            ];
    },
    dataStructuration: function(data){
      var result = [];
      data.forEach(function(element){

        classNameDenomination(result,element);
        arrayConstruction(result[result.length-1],element);

        return result;
      });
      return result;
    }
  };
}]);

})();
