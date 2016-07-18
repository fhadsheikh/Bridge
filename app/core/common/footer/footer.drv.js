'use strict';

angular
    .module('portal')
    .directive('footer', footer);

    function footer(){
        return {
          templateUrl: 'core/common/footer/footer.view.html',
          restrict: 'E',
          replace:true
        };
    }
