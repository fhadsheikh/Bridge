/**
 * @desc Set headers that will be automatically attached to HTTP requests
 * This service will be pushed into $httpProvider's injectors array.
 * Specifically being done in Config block (app.routes.js)
 */

(function(){
    'use strict';

    angular
        .module('portal')
        .factory('authIn-----jector', authInjector);

        function authInjector(){

            var authInjector = {
                request: request
            }

            return authInjector;

            //////////

            function request(config){
                
//                config.headers.Authorization = 'Bearer ' + localStorage.getItem('jwt');
                config.headers.accept = 'application/json';
                config.headers['Content-Type'] = 'application/x-www-form-urlencoded;';
                
//                console.log(token);

                return config;

            }

        }
    
})();
