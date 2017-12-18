(function () {
    var MondriaanController = function ($scope, mondriaanService) {
        $scope.init = "init";
        $scope.boxesSettings = {};

        $scope.startBlank = false;
        $scope.original = true;
        $scope.modified = false;

        $scope.setBlank = function(){
            $scope.startBlank = true;
            $scope.original = false;
            $scope.boxesSettings = {};
        }

        $scope.setOriginal = function(){
            $scope.startBlank = false;
            $scope.original = true;
            $scope.boxesSettings = {};
        }

        $scope.setColor = function(color){
            $scope.colorSetting = color;
        }
        // ng-click="setBoxColor(box.name, colorSetting)"
        $scope.setBoxColor = function(boxClass, colorSetting){
            $scope.modified = true;
            console.log(boxClass, colorSetting)
            $scope.boxesSettings[boxClass] = colorSetting;
            console.log($scope.boxesSettings)
        }

        $scope.getBoxColorSetting = function(boxClass){
            console.log(boxClass)
        }

        mondriaanService.getBoxes()
            .then(function (boxes){
                $scope.boxes = boxes.data.boxes;
                console.log(boxes.data.boxes)
            });
    }

    angular.module('colorMeApp').controller('MondriaanController',
    MondriaanController)

}) ();