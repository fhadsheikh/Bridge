'use strict';

angular
    .module('portal')
    .directive('sideMenu',sideMenu);

    function sideMenu(){

        return {
            templateUrl: 'core/components/admin/side-menu/sideMenu.view.html',
            restrict: 'E',
            replace: true
        }

    }
