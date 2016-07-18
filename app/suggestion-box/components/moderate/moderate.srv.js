'use strict';

angular
    .module('suggestionBox')
    .factory('moderateSrv', moderateSrv);

    function moderateSrv($http,$q,API,$location,user){    
    
        return {

            getSuggestions: function()
            {
              var defer = $q.defer();

              $http.get(API.bridgeUrl +'suggestionsedit/0/1000')
              .success(function onSuccess(res){
                  console.log(res);
                  defer.resolve(res);
              })
              .error(function onError(err){
                  defer.reject(err);
              });

              return defer.promise;
            }

        }
    
    }