'use strict';

angular
    .module('portal')
    .factory('authSrv', authSrv);

    function authSrv($q, jwtHelper, $rootScope, store, $http, $state, API){

        var service = {

            checkAuth: checkAuth,
            isAllowed:isAllowed,
            login: login,
            logout: logout,
            loginDigest: loginDigest

        }

        return service;

        /////////

        function isAllowed(permission){

            var deferred = $q.defer();

            if(store.get('jwt') !== null){

                var jwt = jwtHelper.decodeToken(localStorage.getItem('jwt'));

                if(jwt[permission] == 1){
                    deferred.resolve('User has access');
                } else {
                    deferred.reject('Access denied');
                }
            }
            return deferred.promise;

        }

        function checkAuth(){

            var deferred = $q.defer();

            var jwt = localStorage.getItem('jwt');

            if(jwt && !jwtHelper.isTokenExpired(jwt)){
                $rootScope.$broadcast('userLoggedIn', true);                
                deferred.resolve();
            } else {
                $rootScope.$broadcast('userLoggedIn', false);
                deferred.reject();
            }


            return deferred.promise;

        }        
        
        function login(username, password){

           var data = $.param({
               username: username,
               password: password
           });

            var deferred = $q.defer();

            $http.get(API.bridgeUrl + 'Auth?username=' + username + '&password=' + password)
            // $http.post(API.url + 'auth', data)
            .then(function(res){
                store.set('jwt',res.data);
                deferred.resolve(res.data);

                user = jwtHelper.decodeToken(res.data);
                $rootScope.$broadcast('userDataChanged', {user: user});

                $state.go('suggestions');

            }, function(err){
                deferred.reject(err);
                return err;
            });

            return deferred.promise;

        }

        function loginDigest(username, password){

            console.log('conecting to id provider');

            var deferred = $q.defer();

            $http.get(API.idProvider + 'issue')
            .then(function(res){

                console.log(res);

            }, function(err){

                console.log(err);

            });

            return deferred.promise;

        }

        function logout(){

            var deferred = $q.defer();

            if(store.get('jwt')){
                store.remove('jwt');
                deferred.resolve('User was logged out');
                
                $state.go('login');

            } else {
                deferred.reject('User is already logged out');
            }

            return deferred.promise;
        }


    }