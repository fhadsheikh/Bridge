'use strict';

angular
    .module('portal')
    .factory('creditSrv', creditSrv);

    function creditSrv($http,API, $q){

        var service = {
            getCredits: getCredits
        }

        return service;

        /////////

        function getCredits(){
            
            var deferred = $q.defer();
            
            $http.get(API.bridgeUrl + 'credit')
            // $http.get(API.url + 'user/credits')
            .then(function(res){
                deferred.resolve(res);
            }, function(err){
                deferred.reject(err);
            })
            
            return deferred.promise;
        }

    }