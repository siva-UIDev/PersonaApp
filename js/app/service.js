(function() {
    /* Services to retrive the web service details from backend*/
    angular.module('personaApp')
        .service('dataService', ['$http', function($http) {

            var urlBase = 'https://private-anon-95f10995dd-smaplypersonastest.apiary-mock.com/personas';

            /* Method to retrive the persona details from backend*/

            this.getPersonaDetails = function() {
                return $http.get(urlBase + '/personaId');
            };

            /* Method to retrive the persona column details from backend*/

            this.getColumnDetails = function() {
                return $http.get(urlBase + '/personaId/columns');
            };

            /* Method to retrive the persona field details from backend*/

            this.getpersonFieldDetails = function() {
                return $http.get(urlBase + '/personaId/fields');
            };

        }])

}());