'use strict';

angular
    .module('portal')
    .config(config);

    function config($stateProvider, $urlRouterProvider ,$locationProvider,$httpProvider){
        
        $urlRouterProvider
        .otherwise('suggestions');
        
        $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'core/components/login/login.view.html',
            controller: 'LoginCtrl',
            controllerAs: 'login'
        })
        .state('forbidden', {
            url: '/forbidden',
            templateUrl: 'core/components/forbidden/forbidden.view.html',
            controller: 'ForbiddenCtrl',
            controllerAs: 'forbidden',
            protected: true
        })
        .state('notfound', {
            url: '/notfound',
            templateUrl: 'core/components/not-found/notfound.view.html',
            controller: 'NotfoundCtrl',
            controllerAs: 'notfound',
            protected: true
        })
        .state('admin', {
            url: '/admin',
            templateUrl: 'core/components/admin/admin.view.html',
            controller: 'AdminCtrl',
            controllerAs: 'admin',
            protected: true,
            permission: 'admin'
        })
        .state('admin.manage-users', {
            url: '/manage-users',
            templateUrl: 'core/components/admin/manage-users/manageUsers.view.html',
            controller: 'ManageUsersCtrl',
            controllerAs: 'manageUsers',
            protected: true,
            permission: 'admin'
        })
        .state('admin.manage-techs', {
            url: '/manage-techs',
            templateUrl: 'core/components/admin/manage-techs/manageTechs.view.html',
            controller: 'ManageTechsCtrl',
            controllerAs: 'manageTechs',
            protected: true,
            permission: 'admin'
        })
        .state('admin.manage-schools', {
            url: '/manage-schools',
            templateUrl: 'core/components/admin/manage-schools/manageSchools.view.html',
            controller: 'ManageSchoolsCtrl',
            controllerAs: 'manageSchools',
            protected: true,
            permission: 'admin'
        })

        // Send Authorization header with JWT with each request
        $httpProvider.interceptors.push('authInjector');
        
        //$httpProvider.defaults.headers.common['Authorization'] = localStorage.getItem('jwt');
        
        // Enable html5Mode to remove "#" from URLs
        $locationProvider.html5Mode(true);
    }
