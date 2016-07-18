'use strict';

angular
    .module('suggestionBox')
    .config(config);

    function config($stateProvider){
        
        $stateProvider
        .state('suggestions', {
            url: '/suggestions',
            templateUrl: 'suggestion-box/components/suggestions/suggestions.view.html',
            controller: 'SuggestionsCtrl',
            controllerAs: 'suggestions',
            protected: true,
            permission: 'client'
        })
        .state('new-suggestion', {
            url: '/new-suggestion',
            templateUrl: 'suggestion-box/components/suggestion-new/suggestionNew.view.html',
            controller: 'SuggestionNewCtrl',
            controllerAs: 'suggestionNew',
            protected: true,
            permission: 'client'
        })
        .state('suggestion', {
            url: '/suggestion/:id',
            templateUrl: 'suggestion-box/components/suggestion/suggestion.view.html',
            controller: 'SuggestionCtrl',
            controllerAs: 'suggestion',
            protected: true,
            permission: 'client',
            resolve: {
                suggestion: suggestion
            }
        })
        .state('suggestion-pending', {
            url: '/suggestion/pending/:id',
            templateUrl: 'suggestion-box/components/suggestion-pending/suggestionPending.view.html',
            controller:  'SuggestionPendingCtrl',
            controllerAs: 'suggestionPending',
            protected: true,
            permission: 'client',
            resolve: {
                suggestion: suggestion,
                messages: messages
            }
        })
        .state('moderate', {
            url: '/moderate',
            templateUrl: 'suggestion-box/components/moderate/moderate.view.html',
            controller: 'ModerateCtrl',
            controllerAs: 'moderate',
            protected: true,
            permission: 'admin'
        })
        .state('moderate-suggestion', {
            url: '/moderate/suggestion/:id',
            templateUrl: 'suggestion-box/components/moderate-suggestion/moderateSuggestion.view.html',
            controller: 'ModerateSuggestionCtrl',
            controllerAs: 'moderateSuggestion',
            protected: true,
            permission: 'admin',
            resolve: {
                suggestion: suggestion,
                messages: messages
            }
        })
        
        function isApproved(suggestions,$stateParams){
//            return suggestions.isApproved($stateParams.id);
            
            return true;
        }
        
        function isPending(suggestions, $stateParams, $state){
//            return suggestions.isPending($stateParams.id)
//            .catch(function(){
//                $state.go('notfound');
//            })
            
            return false;
        }
        
        function isOwner(suggestions, $stateParams, $state){
//            return suggestions.isOwner($stateParams.id)
//            .catch(function(){
//                $state.go('forbidden');
//            })
            
            return true;
        }
        
        function suggestion(suggestions,$stateParams){
            return suggestions.getSuggestion($stateParams.id);
        }
        
        function messages(suggestions,$stateParams){
            return suggestions.getMessages($stateParams.id);
        }
        
    }