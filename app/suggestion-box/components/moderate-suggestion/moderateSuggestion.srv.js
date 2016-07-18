'use strict';

angular
    .module('suggestionBox')
    .factory('moderateSuggestion', moderateSuggestion);

    function moderateSuggestion($http,$q,API,$location,user){


        return {

            changeStatus: function(id,status)
            {

                var deferred = $q.defer();

                $http.put(API.bridgeUrl + 'suggestionstatus/'+id+'/'+status)
                .success(function(res){
                    deferred.resolve(res);
                })
                .error(function(err){
                    deferred.reject(err);
                });

                return deferred.promise;
            },

            lookupStatus: function(id)
            {
                if(id == 1) return 'Accepted';

                if(id == 0) return 'Pending';

                if(id == 2) return 'Declined';


            }

        }
}
