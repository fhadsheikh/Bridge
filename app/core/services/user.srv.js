'use strict';

angular
    .module('portal')
    .factory('user',user);

    function user($q,$location,$http,API,jwtHelper,store,$rootScope){

        var user = null;

        var userService = {
            getUser:getUser,
            signUp:signUp,
            deleteUser: deleteUser
        }

        return userService;

        //////////

        function deleteUser(pid){

            var data = $.param({
                pid:pid
            })

            var deferred = $q.defer();

            $http.post(API.url + 'user/delete', data)
            .then(function(res){
                deferred.resolve(res);
            }, function(err){
                deferred.reject(err);
            })

            return deferred.promise;
        }

        function getUser(){
            if(localStorage.getItem('jwt')){
                return jwtHelper.decodeToken(localStorage.getItem('jwt'));
            } else {
                return false;
            }

        }





        function signUp(firstname,lastname,email,password,jobtitle,department,institution){

            var deferred = $q.defer();

            var userData = {
                username: email,
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password,
                jobtitle: jobtitle,
                department: department,
                companyName: institution,
            }

            var data = angular.toJson(userData);

            var req = {
                method: 'POST',
                url: API.bridgeUrl + 'accountRegistration',
                data: data,
                headers : {
                    "Content-Type":"Application/Json"
                }
            }

            $http(req)
            .then(function(res){
                deferred.resolve(res);

            }, function(err){
                deferred.reject(err);
            });

            return deferred.promise;

        }

    };
