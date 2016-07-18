'use strict';

angular
    .module('portal')
    .directive('searchBar', searchBar);

    function searchBar(){
        return {
          restrict: 'E',
          scope: {
            search: '=search'
          },
          link: function(scope){
            scope.$evalAsync(function (search) {
              scope.search.filter = search.filter
            })
          },
          templateUrl: 'core/common/search-bar/searchBar.view.html'
        };

  }
