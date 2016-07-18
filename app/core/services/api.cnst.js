'use strict';

angular
    .module('portal')
    .constant('API', {
        'url':'http://devapps/api/',
        'bridgeUrl':'http://192.168.1.212/Bridge/api/',
        'idProvider': 'http://192.168.1.219/idprovider/api/jwtprovider/'
    });

