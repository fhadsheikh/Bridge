'use strict';

angular
    .module('suggestionBox')
    .controller('SuggestionNewCtrl', suggestionNewCtrl);

    function suggestionNewCtrl($scope,layout,suggestions,$location){
    
    $scope.wizard = {};
    $scope.wizard.rules = true;
    $scope.wizard.form = false;
    $scope.wizard.message = false;

    $scope.beginSubmission = function()
    {
        $scope.wizard.rules = false;
        $scope.wizard.form = true;
        $scope.wizard.message = false;
    };
    
    $scope.endSubmission = function()
    {
        
        $scope.suggestion = {};
        var title = $scope.newsuggestion.title;
        var summary = $scope.newsuggestion.summary;
        
        suggestions.newSuggestion(title,summary)
        .then(function(){
        })
        .catch(function(err){
        });
        
        
        
        $scope.wizard.rules = false;
        $scope.wizard.form = false;
        $scope.wizard.message = true;
    };
    
    $scope.summernoteOptions = {
        height: 150,
        toolbar: [
            ['style', ['bold', 'italic', 'underline']],
            ['alignment', ['ul', 'ol']],
            ['table', ['table']],
            ['edit',['undo','redo']]
        ]
    }
    
    // Stick footer to bottom of screen
    layout.stickyFooter(556);

}
