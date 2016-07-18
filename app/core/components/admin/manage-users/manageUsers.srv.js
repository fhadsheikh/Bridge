'use strict';

angular
    .module('portal')
    .factory('manageUsers', manageUsers);

    function manageUsers($http, $q, API){

        var service = {
            getUsers: getUsers
        }

        return service;

        //////////

        function getUsers(){

            var deferred = $q.defer();

            $http.get(API.url + 'users')
            .then(function(res){
                
                deferred.resolve(res.data);
            }, function(err){
                deferred.reject(err);
            });

            return deferred.promise;

        }

    }
