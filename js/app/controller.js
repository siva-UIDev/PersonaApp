angular.module('personaApp', ['ui.sortable'])
    .controller('personaCtrl', ['$scope', 'dataService', function($scope, dataService) {

        getPersonaDetails();
        getColumnDetails();
        getpersonFieldDetails();

/* Variables: Static variables used for the Wide column*/
        
        $scope.setting = "fa-gear";
        $scope.fieldWideData = [{
                "id": "wide-1",
                "title": "Text field-1 Wide 1",
                "field_type": "short_text",
                "data": "I am data for wide column"
            },
            {
                "id": "wide-2",
                "title": "Text field-2 Wide 2",
                "field_type": "short_text",
                "data": "I am data for wide column"
            },
            {
                "id": "wide-3",
                "title": "Text field-3 Wide 3",
                "field_type": "short_text",
                "data": "I am data for wide column"
            }
        ];
 

/* Method:draggableComponents  Configurations for drag and drop */

        function draggableComponents() {
            
              var originalDraggables = [{
                        "id": $scope.personaFieldInitialValues + 1,
                        "title": "Text field-1",
                        "field_type": "short_text",
                        "data": "I am data"
                    }];

                    $scope.draggables = originalDraggables.map(function(x) {
                        return [x];
                    });
                    $scope.selectedComponents = [];


/* Method:draggableOptions  enables to set the properties of the to be dragged items*/

                    $scope.draggableOptions = {
                        connectWith: ".connected-drop-target-sortable",
                        stop: function(e, ui) {
                            if (ui.item.sortable.source.hasClass('draggable-element-container') &&
                                ui.item.sortable.droptarget &&
                                ui.item.sortable.droptarget != ui.item.sortable.source &&
                                ui.item.sortable.droptarget.hasClass('connected-drop-target-sortable')) {
                                ui.item.sortable.sourceModel.push(ui.item.sortable.model);

                                console.log("New draggable element Data " + angular.toJson($scope.draggables));
                                var droppedItem = $scope.selectedComponents[$scope.selectedComponents.length - 1];

                                droppedItem = angular.toJson(droppedItem);
                                droppedItem = JSON.parse(droppedItem);
                                $scope.personaFieldDetails.push(droppedItem);


                                $scope.draggables[0][0].id = $scope.draggables[0][0].id + 1
                                console.log("New draggable element Data id Increment" + angular.toJson($scope.draggables));

                                console.log("Update of Persona Data fields after dragging of new fields " + angular.toJson($scope.personaFieldDetails));
                            }
                        }
                    };
/* Method:sortableOptions  enables to set the properties of the dragged/sortable items*/

                    $scope.sortableOptions = {
                        items: "div:not(.unsortable)",
                        cancel: ".unsortable"
                   };
    }         

/* Method:getPersonaDetails  returns the persona  objects from service*/

        function getPersonaDetails() {
            dataService.getPersonaDetails()
                .then(function(response) {

                    $scope.personaDetails = response.data.id;
                    $scope.name = response.data.name;
                    $scope.initials = response.data.initials;
                    $scope.color = response.data.color;

                    $scope.persona = {
                        name: {
                            required: true
                        },
                        initial: {
                            required: true
                        }
                    }

                    $scope.$watch('name', function(value) {
                        if ($scope.name) {
                            if (value.length <= 3) {
                                $scope.initials = value;
                            }
                        } else {
                            $scope.initials = "";
                        }
                    });

                }, function(error) {
                    $scope.status = 'Unable to load customer data: ' + error.message;
                });
        }
        
/* Method:getColumnDetails  returns the persona column objects from service*/

        function getColumnDetails() {
            dataService.getColumnDetails()
                .then(function(response) {
                    $scope.personaColumnDetails = response.data;
                }, function(error) {
                    $scope.status = 'Unable to load customer data: ' + error.message;
                });
        }
/* Method:getpersonFieldDetails  returns the persona field objects from service*/

        function getpersonFieldDetails() {
            dataService.getpersonFieldDetails()
                .then(function(response) {
                    $scope.personaFieldDetails = response.data;
                    $scope.personaFieldInitialValues = response.data.length;
                    draggableComponents();
                            

                }, function(error) {
                    $scope.status = 'Unable to load customer data: ' + error.message;
                });
        }
    
    /* Method:settings  enables to delete the persona field*/

        $scope.changeSetting = function(event) {
            if ($scope.setting == "fa-trash") {
                $scope.setting = "fa-gear";
                angular.element(event.target).addClass("fa-trash").removeClass("fa-gear");
                var deletedElementID = angular.element(event.target).closest(".persona-fields").attr("id");
                console.log("ID of the field to be deleted: " + deletedElementID);

                $("#" + deletedElementID).remove();
                $scope.personaFieldDetails = $.grep($scope.personaFieldDetails, function(e) {
                    return e.id != deletedElementID;
                });
                console.log("Update of Data after removal of Fields " + angular.toJson($scope.personaFieldDetails));

            } else {
                angular.element(event.target).addClass("fa-trash").removeClass("fa-gear");
                $scope.setting = "fa-trash";
            }
        };
        
    /* Method:savePersonaName saves the persona name and initials on blur*/

        $scope.savePersonaName = function($event) {
            console.log("Persona Name : " + $scope.name + " and Initial : " + $scope.initials);
        };

    }]);