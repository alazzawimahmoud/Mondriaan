(function () {
    var MondriaanController = function ($scope, mondriaanService) {
        $scope.init = "init";
        $scope.boxesSettings = {};

        $scope.startBlank = false;
        $scope.original = true;
        $scope.modified = false;

        //USED IN VERSION 2   USED IN VERSION 2   USED IN VERSION 2   USED IN VERSION 2   USED IN VERSION 2   USED IN VERSION 2   
        $scope.colorSetting = "";

        $scope.setBlank = function () {
            $scope.startBlank = true;
            $scope.original = false;
            $scope.boxesSettings = {};
        }

        $scope.setOriginal = function () {
            $scope.startBlank = false;
            $scope.original = true;
            $scope.boxesSettings = {};
        }

        //USED IN VERSION 2   USED IN VERSION 2   USED IN VERSION 2   USED IN VERSION 2   USED IN VERSION 2   USED IN VERSION 2   
        $scope.setColor = function (color) {
            $scope.colorSetting = color;
        }

        //USED IN VERSION 2   USED IN VERSION 2   USED IN VERSION 2   USED IN VERSION 2   USED IN VERSION 2   USED IN VERSION 2   
        $scope.setBoxColor = function(box){
            if ($scope.colorSetting.length === 0){
                alert("pick a color! :)")
            } else{
                box.modifiedcolor = $scope.colorSetting;
            }
        }

        //USED IN VERSION 2   USED IN VERSION 2   USED IN VERSION 2   USED IN VERSION 2   USED IN VERSION 2   USED IN VERSION 2   
        $scope.colorDecider = function (box) {
                //default
            if ($scope.original && !box.modifiedcolor) {
                return box.defaultColor
                //blank
            } else if ($scope.blank && !box.modifiedcolor) {
                return "blank"
                //modified
            } else if (box.modifiedcolor) {
                return box.modifiedcolor
            }
        }

        //USED IN VERSION 2   USED IN VERSION 2   USED IN VERSION 2   USED IN VERSION 2   USED IN VERSION 2   USED IN VERSION 2   
        mondriaanService.getBoxes()
            .then(function (boxes) {
                $scope.boxes = boxes.data.boxes;
            });
    }

    angular.module('colorMeApp').controller('MondriaanController',
        MondriaanController)

})();