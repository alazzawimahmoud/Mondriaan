(function () {
    var MondriaanController = function ($scope, mondriaanService) {

        //todo: set standard paintbrushcolor as
        
        $scope.startBlank = false;
        $scope.original = true;
        $scope.colorSetting = "";
        
        //start blank/start original functions:
        $scope.setBlank = function () {
            clearModifiedColors();
            $scope.startBlank = true;
            $scope.original = false;
        }

        $scope.setOriginal = function () {
            clearModifiedColors();
            $scope.startBlank = false;
            $scope.original = true;
        }

        function clearModifiedColors(){
            $scope.boxes.forEach(function(box){
                box.modifiedcolor = "";
            })
        }

        //sets color of the paintbrush
        $scope.setColor = function (color) {
            $scope.colorSetting = color;
        }

        //colors the box
        $scope.setBoxColor = function(box){
            if ($scope.colorSetting.length === 0){
                alert("pick a color! :)")
            } else{
                box.modifiedcolor = $scope.colorSetting;
            }
        }

        // used for ngclass
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

        mondriaanService.getData()
            .then(function (response) {
                $scope.boxes = response.data.boxes;
                $scope.buttons = response.data.buttons;
            });
    }

    angular.module('colorMeApp').controller('MondriaanController',
        MondriaanController)

})();