'use strict';

angular
    .module('suggestionBox')
    .controller('ModerateSuggestionCtrl', moderateSuggestionsCtrl);

    function moderateSuggestionsCtrl($sce, $scope,layout,suggestions,SweetAlert,moderateSuggestion){

        $scope.sugg = suggestions.suggestion();

        $scope.sugg.statusName = moderateSuggestion.lookupStatus($scope.sugg.status);

        $scope.messages = suggestions.messages();

        $scope.edit = function()
        {
            $scope.editView = true;
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


        $scope.cancelEdit = function()
        {
            $scope.editView = false;
        }

        $scope.status = function(status)
        {
            moderateSuggestion.changeStatus($scope.sugg.id, status)
            .then(function(res){
                SweetAlert.swal('Message Sent!', 'You will receive an email notification when responded to.', 'success');

                suggestions.getMessage(res.id)
                .then(function(res){
                    $scope.messages.unshift(res);
                    $scope.newMessage = null;
                    SweetAlert.swal('Message Sent!', 'You will receive an email notification when responded to.', 'success');
                });
            });
        }

        $scope.summernoteOptions = {
            toolbar: [
                ['style', ['bold', 'italic', 'underline']],
                ['alignment', ['ul', 'ol']],
                ['table', ['table']],
                ['edit',['undo','redo']]
            ]
        }



         //Stick footer to bottom of screen
        layout.stickyFooter(690);

}
