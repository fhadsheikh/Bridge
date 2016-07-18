'use strict';

angular
    .module('suggestionBox')
    .directive('searchCard', searchCard);

    function searchCard(){
        return {
          templateUrl: 'suggestion-box/components/suggestions/search-card/searchCard.view.html',
          restrict: 'E',
          replace:true,
          scope:false
        };
  }
