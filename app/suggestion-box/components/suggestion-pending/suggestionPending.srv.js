'use strict';

angular
    .module('suggestionBox')
    .factory('suggestionPending',suggestionPending);

    function suggestionPending($http,$q,API){

    return {
        
        updateSuggestion: function(id,summary)
        {
            
            var suggData = {
                SuggestionId:id,
                Summary:summary
            }

            var data = angular.toJson(suggData);
            
            var deferred = $q.defer();
            
            // $http.put(API.url+'mysuggestions',data)
            $http.put(API.bridgeUrl+'suggestionsummary',data)
            .success(function(res){
                deferred.resolve(res);
            })
            .error(function(err){
                deferred.reject(err);
            });
            
            return deferred.promise;
        }
        
    }
    
}