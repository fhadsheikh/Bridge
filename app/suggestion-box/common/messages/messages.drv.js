'use strict';

angular
    .module('suggestionBox')
    .directive('messages', messages);

    function messages(){
        return {
          restrict: 'E',
          templateUrl: 'suggestion-box/common/messages/messages.view.html'
        };

    }