'use strict';

angular
    .module('portal')
    .factory('manageTechs', manageTechs);

    function manageTechs($http, $q, API){
        
        var service = {
            getTechs: getTechs
        }
        
        return service;
        
        function getTechs(){
            
            var deferred = $q.defer();
            
            $http.get(API.bridgeUrl + 'techs')
            .then(function(res){
                deferred.resolve(res);
            }, function(err){
                deferred.reject(err);
            })
            
            return deferred.promise;
            
        }
        
    }