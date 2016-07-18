'use strict';

angular
    .module('portal')
    .controller('MainCtrl', mainCtrl);
 
    function mainCtrl(user, authSrv, $state,$rootScope, creditSrv){

        var vm = this;

        vm.logout = logout;
        vm.recentSuggestions = $rootScope.recentSuggestions;
        vm.user = user.getUser();

        load();

        function logout(){
            authSrv.logout()
            .then(function(){
                vm.user = null;
                $state.go('login');
            }, function(){
                console.log('unable to log user out');
            });
        };

        function load(){
            checkAuth();
            watchLogin();
            checkAdminPermission();
            watchAdminPermission();
            watchVote();
        }
        
        function watchVote(){
            $rootScope.$on('refreshCredits', function(event,args){
                 creditSrv.getCredits()
                .then(function(res){
                    vm.credits = res.data;
                })
            })
        }

        function checkAuth(){
            authSrv.checkAuth()
            .then(function(){
                vm.loggedin = true;
            }, function(){
                vm.loggedin = false;
            })
        }

        function watchLogin(){
            $rootScope.$on('userLoggedIn',function(event,args){
                if(args){
                    vm.loggedin = true;
                } else {
                    vm.loggedin = false;
                }
            });
        }

        function checkAdminPermission(){
            authSrv.isAllowed('admin')
            .then(function(res){
                vm.isAdmin = true;
            }, function(){
                vm.isAdmin = false;
            });
        }

        function watchAdminPermission(){
            $rootScope.$on('userDataChanged', function(e,a){
                vm.user = a.user;
                // Check if user is Admin
                authSrv.isAllowed('admin')
                .then(function(res){
                    vm.isAdmin = true;
                }, function(){
                    vm.isAdmin = false;
                });

            });

        }

    }
