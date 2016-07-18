'use strict';

angular
    .module('portal')
    .directive('header', header);

    function header(user,$rootScope){
        return {
            templateUrl: 'core/common/header/header.view.html',
            restrict: 'E',
            replace:true,
            link: function(scope){


                var permissions = user.getUser().permissions || false;


                scope.headerItems = [
                    {
                        name: 'Dashboard',
                        icon: 'home'
                    },
                    {
                        name: 'Tickets',
                        icon: 'bug'
                    },
                    {
                        name: 'Tutorials',
                        icon: 'clipboard'
                    },
                    {
                        name: 'Videos',
                        icon: 'youtube-play'
                    },
                    {
                        name: 'Questions',
                        icon: 'question'
                    },
                    {
                        name: 'Discussions',
                        icon: 'comments'
                    },
                    {
                        name: 'Suggestion Box',
                        icon: 'archive',
                        link: 'suggestions',
                        permission: permissions.client
                    },
                    {
                        name: 'Moderate',
                        icon: 'bomb',
                        link: 'moderate',
                        permission: permissions.admin
                    }
                ]

            }
        };
  }
