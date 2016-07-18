'use strict';

angular
    .module('suggestionBox')
    .directive('footerSuggestions', footerSuggestions);

    function footerSuggestions(suggestions){
        return {
            templateUrl: 'suggestion-box/common/footer-card/footerCard.view.html',
            restrict: 'E',
            replace:true,
            link: function(scope){
                suggestions.recentSuggestions()
                .then(function(res){
                    scope.recentSuggestions = res;
                });

            }
        };
    }