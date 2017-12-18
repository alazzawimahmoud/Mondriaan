(function (){
    var mondriaanService = function($http){
      this.getBoxes = function(){
        return $http.get('boxes.json')
      }
    };
    angular.module('colorMeApp').service('mondriaanService', mondriaanService);
  }());