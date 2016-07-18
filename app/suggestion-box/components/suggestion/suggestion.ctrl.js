'use strict';

angular
    .module('suggestionBox')
    .controller('SuggestionCtrl', suggestionCtrl);

    function suggestionCtrl($scope,layout,suggestions,SweetAlert, $rootScope){

    $scope.sugg = suggestions.suggestion();
    
    $scope.like = function(id)
    {
        suggestions.likeSuggestion(id)
        .then(function(res){
            
            if(res == 'not_enough_credits'){
                
                SweetAlert.swal('Not enough credits', 'Credits are reset to a total of 10 each month on the 1st', 'error')
                
            } else {
            
                SweetAlert.swal('Thanks for voting!', '', 'success');
                
                $rootScope.$broadcast('userVoted');
                
                suggestions.getSuggestion(id)
                .then(function(res){
                    
                    $scope.sugg = res;
                    
                })
                
            }
            
        });
    };
    
    $scope.submitMessage = function()
    {
        suggestions.submitMessage($scope.sugg.id, $scope.newMessage)
        .then(function(res){
            suggestions.getMessage(res.id)
            .then(function(res){
                $scope.messages.unshift(res);
                $scope.newMessage = null;
                SweetAlert.swal('Message Sent!', 'You will receive an email notification when responded to.', 'success');

            })
            .catch(function(err){
                console.log(err);
            });
        })
        .catch(function(err){
            console.log(err);
        });
    };
    

    
    // Stick footer to bottom of screen
    layout.stickyFooter(495);
    
  }
