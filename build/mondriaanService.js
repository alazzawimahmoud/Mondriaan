(function (){
    var mondriaanService = function($http){
      this.getData = function(){
        return $http.get('database.json')
      }
    };
    angular.module('colorMeApp').service('mondriaanService', mondriaanService);
  }());