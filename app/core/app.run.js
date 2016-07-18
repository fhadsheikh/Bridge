'use strict';

angular
    .module('portal')
    .run(run);

    function run($rootScope, $location, authSrv, $state){
        $rootScope.$on('$routeChangeError', function(){
            $location.path('/notfound');
        })
        
        $rootScope.$on('$stateChangeStart', stateChangeStart)
        
        function stateChangeStart(event, toState){
            authentication(event, toState);
            authorization(event, toState);
            alreadyLoggedInRedirect(event, toState);
            refreshCredits();
        }
        
        function authentication(event, toState){
            
            if(toState.protected){
                
                authSrv.checkAuth()
                .then(function(){
                    
                }, function(){
                    $state.go('login');
                })
                
            }
            
        }
        
        function authorization(event, toState){
            
            if(toState.permission){
                
                authSrv.isAllowed(toState.permission)
                .then(function(){
                    
                }, function(){
                    $state.go('forbidden');
                })
                
            }
            
        }

        function alreadyLoggedInRedirect(event, toState){

            if(toState.name == 'login'){
                authSrv.checkAuth()
                .then(function(res){
                    $state.go('suggestions');
                })
            }

        }

        function refreshCredits(){
            $rootScope.$broadcast('refreshCredits');
        }
        
        
    }