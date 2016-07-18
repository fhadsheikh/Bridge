'use strict';

angular
    .module('portal')
    .factory('layout',layout);

    function layout(){

        var layout = {
            stickyFooter: stickyFooter,
            validateEmptyFields: validateEmptyFields
        }

        return layout;

        //////////

        function load(){
            resizeWindow();
            stickyFooter();
        }

        function resizeWindow(subtract){
            var height = $(window).height();
            $('.stickyFooterDependancy').css('min-height',height-subtract);
        }

        function stickyFooter(subtract){

            resizeWindow(subtract);

            $(window).resize(function(){resizeWindow(subtract);});

        }

        function validateEmptyFields(fields){
            for (var i = 0; i < fields.length; i++){

                if(fields[i].$pristine){

                    fields[i].$invalid = true;
                    fields[i].$pristine = false;

                }
            }
        }

  }
