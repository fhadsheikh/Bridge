'use strict';

angular
    .module('portal')
    .factory('authInjector', authInjector);

    function authInjector(store){

        var authInjector = {
            request: request
        }

        return authInjector;

        //////////

        function request(config){



            if(store.get('jwt')){
                config.headers.Authorization = 'Bearer '+store.get('jwt').replace(/"/g,"");
            }

            config.headers.accept = 'application/json';
            config.headers['Content-Type'] = 'application/json';

            return config;

        }

    }
