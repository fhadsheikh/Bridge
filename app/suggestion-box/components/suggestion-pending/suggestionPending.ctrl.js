'use strict';

angular
    .module('suggestionBox')
    .controller('SuggestionPendingCtrl', suggestionPendingCtrl);

    function suggestionPendingCtrl(layout,$scope,suggestions,SweetAlert,suggestionPending){
    
    $scope.sugg = suggestions.suggestion();
    
    $scope.messages = suggestions.messages();

    console.log($scope.messages);
    
    $scope.summernoteOptions = {
        toolbar: [
            ['style', ['bold', 'italic', 'underline']],
            ['alignment', ['ul', 'ol']],
            ['table', ['table']],
            ['edit',['undo','redo']]
        ]
    }
    
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
    
    $scope.edit = function()
    {
        $scope.editView = true;
    }
    
    $scope.closeEdit = function()
    {
        $scope.editView = false;
    }
    
    $scope.update = function(id)
    {
        suggestionPending.updateSuggestion(id,$scope.sugg.summary)
        .then(function(res){
            SweetAlert.success('Suggestion Saved', '','success');
            $scope.editView = false;
        });
    }
    
    // Stick footer to bottom of screen
    layout.stickyFooter(690);
  }
