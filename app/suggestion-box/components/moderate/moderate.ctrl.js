'use strict';

angular
    .module('suggestionBox')
    .controller('ModerateCtrl', moderateCtrl);

    function moderateCtrl(layout,moderateSrv,$scope,$location){

        moderateSrv.getSuggestions()
        .then(function(res){
            $scope.suggestions = res;
        }, function(err){

        });

        $scope.filters = [
            {name:'All',class: ''},
            {name:'Approved',class: 'moderate-btn-success'},
            {name:'Pending',class: 'moderate-btn-warning'},
            {name:'Declined',class: 'moderate-btn-danger'}
        ]

        $scope.setFilter = function(filter){


            $scope.search.filter = {};

            if(filter.name == 'All'){
                $scope.search.filter = $scope.search.filter.$;
            } else {
                $scope.search.filter.statusname = filter.name;
            }

        }

        $scope.open = function(id){
            $location.path('/suggestion/pending/'+id);
        }    

        // For search directive
        $scope.search = {
            title: 'Moderate',
            description: 'Search through the pending suggestions below to mark as Approved or Declined',
            filter: 'filter',
            placeHolder: 'Search Suggestions'
        }

        // Stick footer to bottom of screen
        layout.stickyFooter(411);
        
    }